import type { IWheelsData } from '~/data/models/wheels';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v5 as uuidv5 } from 'uuid';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const body: IWheelsData = await readBody(event);

    // Input validation
    if (!body || typeof body !== 'object') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body',
      });
    }

    if (!body.userName || !body.name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: userName and name',
      });
    }

    if (body.uuid === '' || body.newWheel) {
      body.uuid = uuidv5(`${body.userName}${body.name}${Math.random()}`, config.CMDIY_NAMEPSACE);
    }

    const docClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: config.dynamo_id,
          secretAccessKey: config.dynamo_key,
        },
      })
    );

    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
    });

    // Race between the actual request and the timeout
    await Promise.race([
      docClient.send(
        new PutCommand({
          TableName: 'wheelsQueue',
          Item: { ...body, images: [] },
        })
      ),
      timeoutPromise,
    ]);

    return { uuid: body.uuid };
  } catch (error: any) {
    console.error('Error saving wheel details:', error);

    if (error.statusCode) {
      throw error; // Already a formatted error
    } else if (error.name === 'TimeoutError' || error.message?.includes('timed out')) {
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
        statusMessage: `Error saving wheel details: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
