import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const region = 'us-east-1';
  const credentials = {
    accessKeyId: config.app.aws_access_key_id,
    secretAccessKey: config.app.aws_secret_access_key,
  };
  const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region, credentials }));
  const s3Client = new S3Client({ region, credentials });

  const dynamoCommand = new DeleteCommand({
    TableName: 'wheelsQueue',
    Key: {
      uuid: body.uuid,
    },
  });

  if (body.auth !== config.app.validation_key) {
    return { response: 'User is not authorized' };
  } else {
    try {
      return Promise.allSettled([
        await docClient.send(dynamoCommand),
        await deleteFolder(`wheels/uploads/${body.uuid}`),
      ]);
    } catch (error) {
      throw new Error(`Error when deleting items - ${error}`);
    }
  }

  // This function came from here https://www.codemzy.com/blog/delete-s3-folder-nodejs
  async function deleteFolder(location: any) {
    let bucket = 'classicminidiy';
    let count = 0; // number of files deleted
    async function recursiveDelete(token?: any) {
      // get the files
      const listCommand = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: location,
        ContinuationToken: token,
      });
      let list = await s3Client.send(listCommand);
      if (list.KeyCount) {
        // if items to delete
        // delete the files
        const deleteCommand = new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: list?.Contents?.map((item) => ({ Key: item.Key })),
            Quiet: false,
          },
        });
        let deleted = await s3Client.send(deleteCommand);
        count += deleted.Deleted.length;
        // log any errors deleting files
        if (deleted.Errors) {
          deleted.Errors.map((error) => console.log(`${error.Key} could not be deleted - ${error.Code}`));
        }
      }
      // repeat if more files to delete
      if (list.NextContinuationToken) {
        recursiveDelete(list.NextContinuationToken);
      }
      // return total deleted count when finished
      return `${count} files deleted.`;
    }
    // start the recursive function
    return recursiveDelete();
  }
});
