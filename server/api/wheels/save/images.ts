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

  // Input validation
  if (!uuid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required uuid parameter',
    });
  }

  const region = 'us-east-1';
  const credentials = {
    accessKeyId: config.s3_id,
    secretAccessKey: config.s3_key,
  };
  const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region, credentials }));
  const s3Client = new S3Client({ region, credentials });

  try {
    if (headers['content-type']?.includes('multipart/form-data')) {
      body = await parseMultipartNodeRequest(event.node.req).then(async (res) => {
        const newUrls = parseNewUrls(res);
        await associateNewImagesDynamo(newUrls, uuid);
      });
    } else {
      body = await readBody(event);
    }

    return { ok: true };
  } catch (error: any) {
    console.error('Error uploading wheel images:', error);

    if (error.statusCode) {
      throw error; // Already a formatted error
    } else if (error.name === 'TimeoutError' || error.message?.includes('timed out')) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Upload request timed out',
      });
    } else if (error.name === 'ValidationException') {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid request: ${error.message}`,
      });
    } else if (error.name === 'NoSuchBucket') {
      throw createError({
        statusCode: 404,
        statusMessage: 'S3 bucket not found',
      });
    } else if (error.name === 'AccessDenied') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to S3 bucket',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error uploading wheel images: ${error.message || 'Unknown error'}`,
      });
    }
  }

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

  async function associateNewImagesDynamo(imagePaths: string[], uuid: string): Promise<UpdateCommandOutput> {
    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Race between the actual request and the timeout
    return await Promise.race([
      docClient.send(
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
      ),
      timeoutPromise,
    ]);
  }

  function parseNewUrls(uploadedFiles: any): string[] {
    const fileList: string[] = [];
    _.forEach(uploadedFiles, (value) => {
      fileList.push(value[0].location);
    });
    return fileList;
  }
});
