import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { ColorQueueItem } from '../../../../data/models/colors';
import { getDynamoDBClient, withTimeout, handleDynamoDBError } from '../../../utils/dynamodb';

export default defineEventHandler(async (event): Promise<ColorQueueItem[]> => {
  // Set cache headers - cache for 5 minutes since queue data changes frequently
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=300, s-maxage=300',
    'CDN-Cache-Control': 'public, max-age=300',
  });

  const docClient = getDynamoDBClient();

  try {
    const command = new ScanCommand({
      TableName: 'colorsQueue',
      Limit: 1000,
    });

    // Use longer timeout for scan operations
    const result = await withTimeout(docClient.send(command), 15000);

    if (!result.Items) {
      return [];
    }

    return result.Items as ColorQueueItem[];
  } catch (error: any) {
    console.error('Error getting colors queue info:', error);
    throw handleDynamoDBError(error, 'Get colors queue');
  }
});
