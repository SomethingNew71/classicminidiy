import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const queryParams = getQuery(event);
  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  return await docClient
    .send(
      new GetCommand({
        TableName: 'BlogViews',
        Key: { postID: queryParams.title },
      })
    )
    .catch((e) => {
      throw new Error(e);
    });
});
