import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DateTime } from 'luxon';
import type { RegistryItem } from '~/data/models/registry';

const createDynamoDBClient = (config: any) => {
  return DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.dynamo_id,
        secretAccessKey: config.dynamo_key,
      },
    })
  );
};

export default defineEventHandler(async (): Promise<RegistryItem[]> => {
  const config = useRuntimeConfig();
  const docClient = createDynamoDBClient(config);

  try {
    const command = new ScanCommand({ TableName: 'MiniRegisterQueue' });
    const { Items } = await docClient.send(command);
    if (!Items) {
      return [];
    }

    const parsedResponse: RegistryItem[] = (Items as RegistryItem[]).map((item) => ({
      ...item,
      buildDate: DateTime.fromISO(item.buildDate as string).toISODate(),
    }));

    return parsedResponse;
  } catch (error: any) {
    throw new Error(`Error getting registry info - ${error?.message}`);
  }
});
