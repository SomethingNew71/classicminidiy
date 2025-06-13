import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  let allWheels;
  const config = useRuntimeConfig();

  // Set cache headers - cache for 3 months since wheel data is relatively static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
    'CDN-Cache-Control': 'public, max-age=7776000',
  });

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.dynamo_id,
        secretAccessKey: config.dynamo_key,
      },
      // Add timeout settings
      requestHandler: {
        timeoutInMs: 5000, // 5 second timeout
      },
    })
  );

  try {
    const scanCommand = new ScanCommand({
      TableName: 'wheels',
    });

    // Add timeout handling
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Race between the actual request and the timeout
    allWheels = await Promise.race([docClient.send(scanCommand).then((res) => res.Items), timeoutPromise]);
  } catch (error: any) {
    console.error('Error fetching wheels:', error);
    throw createError({
      statusCode: 500,
      statusMessage: `Unable to fetch wheels - ${error?.message || 'Unknown error'}`,
    });
  }

  return allWheels;
});
