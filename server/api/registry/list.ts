import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DateTime } from 'luxon';
import type { RegistryItem } from '~/data/models/registry';

export default defineEventHandler(async (): Promise<RegistryItem[] | undefined> => {
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
    let parsedResponse: RegistryItem[] | undefined;
    await docClient
      .send(
        new ScanCommand({
          TableName: 'MiniRegister',
        })
      )
      .then(({ Items }) => {
        parsedResponse = Items?.map(
          (item: any): RegistryItem => ({
            ...item,
            buildDate:
              item.buildDate !== '---'
                ? DateTime.fromISO(item.buildDate).toFormat('LLL dd, yyyy').toString
                : item.buildDate,
          })
        );
      });

    return parsedResponse;
  } catch (error) {
    throw new Error(`Error getting registry info - ${error}`);
  }
});
