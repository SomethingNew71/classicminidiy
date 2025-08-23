import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getDynamoDBClient, withTimeout, handleDynamoDBError } from '../../utils/dynamodb';

export default defineEventHandler(async (event) => {
  let allWheels;

  // Set cache headers - cache for 3 months since wheel data is relatively static
  setResponseHeaders(event, {
    'Cache-Control': 'public, max-age=7776000, s-maxage=7776000',
    'CDN-Cache-Control': 'public, max-age=7776000',
  });

  const docClient = getDynamoDBClient();

  try {
    const scanCommand = new ScanCommand({
      TableName: 'wheels',
    });

    // Use the timeout utility with optimized client
    const result = await withTimeout(docClient.send(scanCommand), 5000);
    allWheels = result.Items;
  } catch (error: any) {
    throw handleDynamoDBError(error, 'Fetching wheels data');
  }

  return allWheels;
});
