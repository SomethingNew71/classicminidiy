import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DateTime } from 'luxon';
import type { RegistryItem } from '../../../../data/models/registry';
import { getDynamoDBClient, withTimeout, handleDynamoDBError } from '../../../utils/dynamodb';

export default defineEventHandler(async (event): Promise<RegistryItem[]> => {
  // Set cache headers - cache for 5 minutes since queue data changes frequently
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=300, s-maxage=300',
    'CDN-Cache-Control': 'public, max-age=300',
  });

  const docClient = getDynamoDBClient();

  try {
    const command = new ScanCommand({
      TableName: 'MiniRegisterQueue',
      Limit: 1000,
    });

    // Use longer timeout for scan operations
    const result = await withTimeout(docClient.send(command), 15000);

    if (!result.Items) {
      return [];
    }

    const parsedResponse: RegistryItem[] = (result.Items as RegistryItem[]).map((item) => ({
      ...item,
      buildDate: DateTime.fromISO(item.buildDate as string).toISODate(),
    }));

    return parsedResponse;
  } catch (error: any) {
    console.error('Error getting registry queue info:', error);
    throw handleDynamoDBError(error, 'Get registry queue');
  }
});
