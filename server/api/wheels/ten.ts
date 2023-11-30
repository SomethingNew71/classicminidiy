import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.app.aws_access_key_id,
      secretAccessKey: config.app.aws_secret_access_key,
    },
  });
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new QueryCommand({
    TableName: 'wheels',
    IndexName: 'size-index',
    KeyConditionExpression: 'size = :size',
    ExpressionAttributeValues: {
      ':size': '10',
    },
  });

  const response = await docClient.send(command);
  return response.Items;
});
