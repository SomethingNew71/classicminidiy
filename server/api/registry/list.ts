import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DateTime } from 'luxon';

export default defineEventHandler(async () => {
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
    return await docClient
      .send(
        new ScanCommand({
          TableName: 'MiniRegister',
        })
      )
      .then(({ Items }) =>
        Items?.map((item) => ({
          ...item,
          buildDate:
            item.buildDate !== '---' ? DateTime.fromISO(item.buildDate).toFormat('LLL dd, yyyy') : item.buildDate,
        }))
      );
  } catch (error) {
    throw new Error(`Error getting registry info - ${error}`);
  }
});
