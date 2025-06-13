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

export default defineEventHandler(async (event): Promise<RegistryItem[]> => {
  // Set cache headers - cache for 5 minutes since queue data changes frequently
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=300, s-maxage=300',
    'CDN-Cache-Control': 'public, max-age=300',
  });

  const config = useRuntimeConfig();
  const docClient = createDynamoDBClient(config);

  try {
    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    const command = new ScanCommand({ TableName: 'MiniRegisterQueue' });

    // Race between the actual request and the timeout
    const result = await Promise.race([docClient.send(command), timeoutPromise]);

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
        statusMessage: 'Registry queue table not found',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error getting registry queue info: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
