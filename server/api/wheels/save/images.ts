import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, type UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import formidable from 'formidable';
import _ from 'lodash';
import { PassThrough } from 'stream';

export default defineEventHandler(async (event) => {
  let body;
  const config = useRuntimeConfig();
  const headers = getRequestHeaders(event);
  const params = getQuery(event);
  const uuid = params.uuid?.toString();
  const region = 'us-east-1';
  const credentials = {
    accessKeyId: config.app.aws_access_key_id,
    secretAccessKey: config.app.aws_secret_access_key,
  };
  const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region, credentials }));
  const s3Client = new S3Client({ region, credentials });

  if (uuid) {
    try {
      if (headers['content-type']?.includes('multipart/form-data')) {
        body = await parseMultipartNodeRequest(event.node.req).then(async (res) => {
          const newUrls = await parseNewUrls(res);
          await associateNewImagesDynamo(newUrls, uuid);
        });
      } else {
        body = await readBody(event);
      }
    } catch (error) {
      throw new Error(`Unable to upload images - ${error}`);
    }
  } else {
    throw new Error('No UUID provided');
  }
  return { ok: true };

  // Figured out how to do this using this https://austingil.com/upload-to-s3/
  function parseMultipartNodeRequest(req: any) {
    return new Promise((resolve, reject) => {
      const s3Uploads: any[] = [];

      function fileWriteStreamHandler(file: any): PassThrough {
        const body = new PassThrough();
        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: 'classicminidiy',
            Key: `wheels/uploads/${uuid}/${file.originalFilename}`,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Body: body,
          },
        });
        const uploadRequest = upload.done().then((response) => {
          file.location = response.Location;
        });
        s3Uploads.push(uploadRequest);
        return body;
      }
      const form = formidable({
        multiples: true,
        fileWriteStreamHandler: fileWriteStreamHandler,
      });
      form.parse(req, (error, fields, files) => {
        if (error) {
          reject(error);
          return;
        }
        Promise.all(s3Uploads)
          .then(() => {
            resolve({ ...fields, ...files });
          })
          .catch(reject);
      });
    });
  }

  function associateNewImagesDynamo(imagePaths: string[], uuid: string): Promise<UpdateCommandOutput> {
    return docClient.send(
      new UpdateCommand({
        TableName: 'wheelsQueue',
        Key: { uuid: uuid },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set #images = list_append(if_not_exists(#images, :empty_list), :location)',
        ExpressionAttributeNames: {
          '#images': 'images',
        },
        ExpressionAttributeValues: {
          ':location': imagePaths,
          ':empty_list': [],
        },
      })
    );
  }
  function parseNewUrls(uploadedFiles: any): string[] {
    const fileList: string[] = [];
    _.forEach(uploadedFiles, (value, key) => {
      fileList.push(value[0].location);
    });
    return fileList;
  }
});
