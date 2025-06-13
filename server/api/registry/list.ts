import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DateTime } from 'luxon';
import type { RegistryItem } from '~/data/models/registry';

export default defineEventHandler(async (event): Promise<RegistryItem[]> => {
  // Set cache headers - cache for 15 minutes since registry data changes occasionally
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=900, s-maxage=900',
    'CDN-Cache-Control': 'public, max-age=900',
  });

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

    // Race between the actual request and the timeout
    const result = await Promise.race([docClient.send(new ScanCommand({ TableName: 'MiniRegister' })), timeoutPromise]);

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
        statusMessage: 'Registry table not found',
      });
    } else if (error.statusCode) {
      // If we already created an error with createError, just rethrow it
      throw error;
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error getting registry info: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
