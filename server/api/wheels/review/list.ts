import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, type ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.dynamo_id,
        secretAccessKey: config.dynamo_key,
      },
    })
  );

  try {
    const scanCommand = new ScanCommand({
      TableName: 'wheelsQueue',
    });
    const response: ScanCommandOutput = await docClient.send(scanCommand);
    return response.Items;
  } catch (error: any) {
    console.error('Error scanning DynamoDB table:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
