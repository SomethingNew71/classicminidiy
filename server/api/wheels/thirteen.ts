import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import type { RuntimeConfig } from 'nuxt/schema';

const createDynamoDBClient = (config: RuntimeConfig) => {
  return new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.dynamo_id,
      secretAccessKey: config.dynamo_key,
    },
  });
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const client = createDynamoDBClient(config);
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new QueryCommand({
    TableName: 'wheels',
    IndexName: 'size-index',
    KeyConditionExpression: 'size = :size',
    ExpressionAttributeValues: {
      ':size': '13',
    },
  });

  const response = await docClient.send(command);
  return response.Items;
});
