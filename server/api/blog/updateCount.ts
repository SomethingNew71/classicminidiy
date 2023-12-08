import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const newCount = body.count + 1;

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  try {
    return await docClient
      .send(
        new PutCommand({
          TableName: 'BlogViews',
          Item: {
            postID: body.title,
            Count: newCount,
          },
        })
      )
      .then(() => newCount);
  } catch (error) {
    throw new Error(`Error updating the count - ${error}`);
  }
});
