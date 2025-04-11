import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { Color } from '~/data/models/colors';

export default defineEventHandler(async (): Promise<Color[]> => {
  let allColors;
  const config = useRuntimeConfig();
  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.dynamo_id,
        secretAccessKey: config.app.dynamo_key,
      },
    })
  );

  try {
    const scanCommand = new ScanCommand({
      TableName: 'colors',
    });
    allColors = await docClient.send(scanCommand).then(({ Items }) => Items as Color[]);
  } catch (error: any) {
    throw new Error(`Unable to fetch color data - ${error?.message}`);
  }

  return allColors;
});
