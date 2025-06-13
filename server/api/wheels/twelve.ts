import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import type { RuntimeConfig } from 'nuxt/schema';

const createDynamoDBClient = (config: RuntimeConfig) => {
  return new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.dynamo_id,
      secretAccessKey: config.dynamo_key,
    },
  });
};

export default defineEventHandler(async (event) => {
  // Set cache headers - cache for 3 months since wheel data is relatively static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
    'CDN-Cache-Control': 'public, max-age=7776000',
  });

  const config = useRuntimeConfig();
  const client = createDynamoDBClient(config);
  const docClient = DynamoDBDocumentClient.from(client);

  try {
    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    const command = new QueryCommand({
      TableName: 'wheels',
      IndexName: 'size-index',
      KeyConditionExpression: 'size = :size',
      ExpressionAttributeValues: {
        ':size': '12',
      },
    });

    // Race between the actual request and the timeout
    const response = await Promise.race([docClient.send(command), timeoutPromise]);

    return response.Items || [];
  } catch (error: any) {
    console.error('Error fetching 12-inch wheels:', error);

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
        statusMessage: 'Wheels table not found',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetching 12-inch wheels: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
