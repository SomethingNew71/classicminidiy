import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import type { RuntimeConfig } from 'nuxt/schema';
import type { IWheelsData } from '../../../data/models/wheels';

const createDynamoDBClient = (config: RuntimeConfig) => {
  return new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.dynamo_id,
      secretAccessKey: config.dynamo_key,
    },
    // Add timeout settings
    requestHandler: {
      timeoutInMs: 5000, // 5 second timeout
    },
  });
};

export default defineEventHandler(async (event): Promise<IWheelsData> => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  // Set cache headers - cache for 3 months since wheel data is relatively static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
    'CDN-Cache-Control': 'public, max-age=7776000',
  });

  // Validate input
  if (!query.uuid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required uuid parameter',
    });
  }

  const client = createDynamoDBClient(config);
  const docClient = DynamoDBDocumentClient.from(client);

  try {
    // Add timeout handling
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Race between the actual request and the timeout
    const result = (await Promise.race([
      docClient.send(
        new GetCommand({
          TableName: 'wheels',
          Key: {
            uuid: query.uuid,
          },
        })
      ),
      timeoutPromise,
    ])) as { Item?: Record<string, any> };

    // Check if item exists
    if (!result.Item) {
      throw createError({
        statusCode: 404,
        statusMessage: `Wheel with uuid ${query.uuid} not found`,
      });
    }

    // Sanitize notes field
    if (result.Item?.notes) {
      result.Item.notes = result.Item.notes.replace(/<\/?[^>]+(>|$)/g, '');
    }

    return result.Item as IWheelsData;
  } catch (err: any) {
    console.error('Error fetching wheel data:', err);

    // Handle different error types
    if (err.statusCode) {
      throw err; // Already a formatted error
    } else if (err.name === 'TimeoutError' || err.message?.includes('timed out')) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Request to database timed out',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetching wheel data: ${err.message || 'Unknown error'}`,
      });
    }
  }
});
