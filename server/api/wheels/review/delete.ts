import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
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

    if (body.auth !== config.validation_key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User is not authorized',
      });
    }

    const region = 'us-east-1';
    const credentials = {
      accessKeyId: config.s3_id,
      secretAccessKey: config.s3_key,
    };
    const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region, credentials }));
    const s3Client = new S3Client({ region, credentials });

    // Create timeout promises
    const dynamoTimeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    const s3TimeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('S3 request timed out')), 10000); // Longer timeout for S3 operations
    });

    const dynamoCommand = new DeleteCommand({
      TableName: 'wheelsQueue',
      Key: { uuid: body.uuid },
    });

    const deleteResults = await Promise.allSettled([
      Promise.race([docClient.send(dynamoCommand), dynamoTimeoutPromise]),
      Promise.race([deleteFolder(`wheels/uploads/${body.uuid}`), s3TimeoutPromise]),
    ]);

    return {
      response: 'Wheel review item deleted successfully',
      results: deleteResults,
    };

    async function deleteFolder(location: string) {
      const bucket = 'classicminidiy';
      let count = 0;

      async function recursiveDelete(token?: string): Promise<number> {
        const listCommand = new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: location,
          ContinuationToken: token,
        });

        const list = await s3Client.send(listCommand);

        if (list.KeyCount) {
          const deleteCommand = new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: {
              Objects: list.Contents?.map((item) => ({ Key: item.Key })) || [],
              Quiet: false,
            },
          });

          const deleted = await s3Client.send(deleteCommand);
          count += deleted.Deleted?.length || 0;

          if (deleted.Errors) {
            deleted.Errors.forEach((error) => console.error(`${error.Key} could not be deleted - ${error.Code}`));
          }
        }

        if (list.NextContinuationToken) {
          return recursiveDelete(list.NextContinuationToken);
        }

        return count;
      }

      return recursiveDelete();
    }
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
