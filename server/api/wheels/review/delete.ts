import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { WheelItemStatus } from '../../../../data/models/wheels';
import { requireAdminAuth } from '../../../utils/adminAuth';

export default defineEventHandler(async (event: any) => {
  // Require admin authentication
  await requireAdminAuth(event);
  const config = useRuntimeConfig();

  try {
    const body = await readBody(event);

    // Input validation
    if (!body || typeof body !== 'object') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body',
      });
    }

    if (!body.uuid) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required uuid parameter',
      });
    }

    // Admin authentication already handled by requireAdminAuth()

    const docClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: config.dynamo_id,
          secretAccessKey: config.dynamo_key,
        },
      })
    );

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Update status to rejected instead of deleting
    const updateCommand = new UpdateCommand({
      TableName: 'wheelsQueue',
      Key: { uuid: body.uuid },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': WheelItemStatus.REJECTED,
      },
      ReturnValues: 'ALL_NEW',
    });

    await Promise.race([docClient.send(updateCommand), timeoutPromise]);

    return {
      response: 'Wheel review item rejected successfully',
    };
  } catch (error: any) {
    console.error('Error deleting wheel review item:', error);

    if (error.statusCode) {
      throw error; // Already a formatted error
    } else if (error.name === 'TimeoutError' || error.message?.includes('timed out')) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Delete request timed out',
      });
    } else if (error.name === 'ValidationException') {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid request: ${error.message}`,
      });
    } else if (error.name === 'ResourceNotFoundException') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Wheel review item not found',
      });
    } else if (error.name === 'NoSuchBucket') {
      throw createError({
        statusCode: 404,
        statusMessage: 'S3 bucket not found',
      });
    } else if (error.name === 'AccessDenied') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to S3 bucket',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error deleting wheel review item: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
