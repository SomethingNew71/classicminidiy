import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { Color } from '../../../data/models/colors';

export default defineEventHandler(async (event): Promise<Color[]> => {
  // Set cache headers - cache for 3 months since color data is relatively static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
    'CDN-Cache-Control': 'public, max-age=7776000',
  });

  let allColors;
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
    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Set up the scan command
    const scanCommand = new ScanCommand({
      TableName: 'colors',
    });

    // Race between the actual request and the timeout
    const result = await Promise.race([docClient.send(scanCommand), timeoutPromise]);

    allColors = result.Items as Color[];

    if (!allColors || !Array.isArray(allColors)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response format from database',
      });
    }

    return allColors;
  } catch (error: any) {
    console.error('Error fetching colors data:', error);

    if (error.name === 'TimeoutError' || error.message?.includes('timed out')) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Database request timed out',
      });
    } else if (error.name === 'ValidationException') {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid request: ${error.message}`,
      });
    } else if (error.name === 'ResourceNotFoundException') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Colors table not found',
      });
    } else if (error.statusCode) {
      // If we already created an error with createError, just rethrow it
      throw error;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Unable to fetch color data: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
