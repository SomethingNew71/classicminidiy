import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { createDynamoDBClient, APIError } from '~/server/utils/api-utils';
import { getCached, setCache } from '~/server/utils/cache';
import type { PrettyColor } from '~/data/models/colors';

export default defineEventHandler(async (event): Promise<PrettyColor> => {
  const config = useRuntimeConfig();
  const params = getQuery(event);
  const docClient = createDynamoDBClient(config);
  const cacheKey = `color:${params.id}`;

  try {
    // Try to get from cache first
    const cached = await getCached<PrettyColor>(cacheKey);
    if (cached) return cached;

    if (!params.id) {
      throw new APIError(400, 'Both id and name parameters are required');
    }

    const { Item } = await docClient.send(
      new GetCommand({
        TableName: 'colors',
        Key: {
          id: params.id,
        },
      })
    );

    if (!Item) {
      throw new APIError(404, 'Color not found');
    }

    const parsedColor: PrettyColor = {
      pretty: {
        'Primary Color': Item.primaryColor,
        Code: Item.code,
        hasSwatch: Item.hasSwatch,
        'Ditzler PPG Code': Item.ditzlerPpgCode,
        'Dulux Code': Item.duluxCode,
        Name: Item.name,
        'Short Code': Item.shortCode,
        Years: Item.years,
        ID: Item.id,
      },
      raw: Item as any, // Cast to any since we know the shape matches
    };

    // Cache the result
    await setCache(cacheKey, parsedColor);

    return parsedColor;
  } catch (error: any) {
    if (error instanceof APIError) throw error;
    throw new APIError(500, `Failed to fetch color: ${error.message}`);
  }
});
