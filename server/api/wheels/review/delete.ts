import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const region = 'us-east-1';
  const credentials = {
    accessKeyId: config.app.s3_id,
    secretAccessKey: config.app.s3_key,
  };
  const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region, credentials }));
  const s3Client = new S3Client({ region, credentials });

  if (body.auth !== config.app.validation_key) {
    return { response: 'User is not authorized' };
  }

  try {
    const dynamoCommand = new DeleteCommand({
      TableName: 'wheelsQueue',
      Key: { uuid: body.uuid },
    });

    const deleteResults = await Promise.allSettled([
      docClient.send(dynamoCommand),
      deleteFolder(`wheels/uploads/${body.uuid}`),
    ]);

    return deleteResults;
  } catch (error) {
    console.error('Error when deleting items:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }

  async function deleteFolder(location: string) {
    const bucket = 'classicminidiy';
    let count = 0;

    async function recursiveDelete(token?: string): Promise<number> {
      const listCommand = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: location,
        ContinuationToken: token,
      });

      const list = await s3Client.send(listCommand);

      if (list.KeyCount) {
        const deleteCommand = new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: list.Contents?.map((item) => ({ Key: item.Key })) || [],
            Quiet: false,
          },
        });

        const deleted = await s3Client.send(deleteCommand);
        count += deleted.Deleted?.length || 0;

        if (deleted.Errors) {
          deleted.Errors.forEach((error) => console.error(`${error.Key} could not be deleted - ${error.Code}`));
        }
      }

      if (list.NextContinuationToken) {
        return recursiveDelete(list.NextContinuationToken);
      }

      return count;
    }

    return recursiveDelete();
  }
});
