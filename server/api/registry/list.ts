import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DateTime } from 'luxon';
import type { RegistryItem } from '../../../data/models/registry';
import { getDynamoDBClient, withTimeout, handleDynamoDBError } from '../../utils/dynamodb';

export default defineEventHandler(async (event): Promise<RegistryItem[]> => {
  // Set cache headers - cache for 15 minutes since registry data changes occasionally
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=900, s-maxage=900',
    'CDN-Cache-Control': 'public, max-age=900',
  });

  const docClient = getDynamoDBClient();

  try {
    // Use a longer timeout for scan operations (15 seconds) as they can be slow on large tables
    const result = await withTimeout(
      docClient.send(
        new ScanCommand({
          TableName: 'MiniRegister',
          // Limit the number of items to improve performance
          Limit: 1000,
        })
      ),
      15000 // 15 second timeout for scan operations
    );

    if (!result.Items || !Array.isArray(result.Items)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response format from database',
      });
    }

    const parsedResponse: RegistryItem[] = (result.Items as RegistryItem[]).map((item) => ({
      ...item,
      buildDate: DateTime.fromISO(item.buildDate as string).toISODate(),
    }));

    return parsedResponse;
  } catch (error: any) {
    console.error('Error getting registry info:', error);
    throw handleDynamoDBError(error, 'Get registry list');
  }
});
