import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { createDynamoDBClient, APIError } from '../../../server/utils/api-utils';
import { getCached, setCache } from '../../../server/utils/cache';
import type { PrettyColor } from '../../../data/models/colors';

export default defineEventHandler(async (event): Promise<PrettyColor> => {
  const config = useRuntimeConfig();
  const params = getQuery(event);
  const docClient = createDynamoDBClient(config);
  const cacheKey = `color:${params.id}`;

  // Set cache headers - cache for 15 minutes since color data changes occasionally
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=900, s-maxage=900',
    'CDN-Cache-Control': 'public, max-age=900',
  });

  try {
    // Try to get from cache first
    const cached = await getCached<PrettyColor>(cacheKey);
    if (cached) return cached;

    if (!params.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Color ID is required',
      });
    }

    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Race between the actual request and the timeout
    const result = await Promise.race([
      docClient.send(
        new GetCommand({
          TableName: 'colors',
          Key: {
            id: params.id,
          },
        })
      ),
      timeoutPromise,
    ]);

    if (!result.Item) {
      throw createError({
        statusCode: 404,
        statusMessage: `Color with ID ${params.id} not found`,
      });
    }

    const parsedColor: PrettyColor = {
      pretty: {
        'Primary Color': result.Item.primaryColor,
        Code: result.Item.code,
        hasSwatch: result.Item.hasSwatch,
        'Ditzler PPG Code': result.Item.ditzlerPpgCode,
        'Dulux Code': result.Item.duluxCode,
        Name: result.Item.name,
        'Short Code': result.Item.shortCode,
        Years: result.Item.years,
        ID: result.Item.id,
      },
      raw: result.Item as any, // Cast to any since we know the shape matches
    };

    // Cache the result
    await setCache(cacheKey, parsedColor);

    return parsedColor;
  } catch (error: any) {
    if (error instanceof APIError) throw error;
    throw new APIError(500, `Failed to fetch color: ${error.message}`);
  }
});
