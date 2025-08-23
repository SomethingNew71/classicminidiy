import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { Color } from '../../../data/models/colors';
import { getDynamoDBClient, withTimeout, handleDynamoDBError } from '../../utils/dynamodb';

export default defineEventHandler(async (event): Promise<Color[]> => {
  // Set cache headers - cache for 3 months since color data is relatively static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
    'CDN-Cache-Control': 'public, max-age=7776000',
  });

  let allColors;
  const docClient = getDynamoDBClient();

  try {
    const scanCommand = new ScanCommand({
      TableName: 'colors',
    });

    // Use the timeout utility with optimized client
    const result = await withTimeout(docClient.send(scanCommand), 5000);

    allColors = result.Items as Color[];

    if (!allColors || !Array.isArray(allColors)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response format from database',
      });
    }

    return allColors;
  } catch (error: any) {
    throw handleDynamoDBError(error, 'Fetching colors data');
  }
});
