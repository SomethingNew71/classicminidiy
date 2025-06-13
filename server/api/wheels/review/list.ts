import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, type ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  // Set cache headers - cache for 5 minutes since review queue data changes frequently
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=300, s-maxage=300',
    'CDN-Cache-Control': 'public, max-age=300',
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

    const scanCommand = new ScanCommand({
      TableName: 'wheelsQueue',
    });

    // Race between the actual request and the timeout
    const response: ScanCommandOutput = await Promise.race([docClient.send(scanCommand), timeoutPromise]);

    return response.Items || [];
  } catch (error: any) {
    console.error('Error fetching wheels review queue:', error);

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
        statusMessage: 'Wheels queue table not found',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetching wheels review queue: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
