import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async () => {
  let allWheels;
  const config = useRuntimeConfig();
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
    const scanCommand = new ScanCommand({
      TableName: 'wheelsQueue',
    });
    allWheels = await docClient.send(scanCommand);
  } catch (error: any) {
    throw new Error(error);
  }

  return allWheels.Items;
});
