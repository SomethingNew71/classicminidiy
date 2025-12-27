import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import type { ColorQueueItem, ColorQueueSubmissionResponse } from '../../../../data/models/colors';
import { ColorItemStatus } from '../../../../data/models/colors';
import { v5 as uuidv5 } from 'uuid';

const CMDIY_NAMESPACE = 'a48a62bf-fec1-4ed7-9381-a1bf2a08738c';

export default defineEventHandler(async (event): Promise<ColorQueueSubmissionResponse> => {
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
    const { details } = await readBody<{ details: ColorQueueItem }>(event);
    validateDetails(details);

    // Generate UUID from submitter name
    details.id = uuidv5(details.submittedBy + Date.now(), CMDIY_NAMESPACE);
    details.status = ColorItemStatus.PENDING;
    details.hasSwatch = details.hasSwatch || false;

    await docClient.send(
      new PutCommand({
        TableName: 'colorsQueue',
        Item: { ...details },
      })
    );

    return {
      uuid: details.id,
      details,
    };
  } catch (error: any) {
    console.error('Error submitting color to queue:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: `Error submitting to Queue - ${error?.message}`,
    });
  }
});

function validateDetails(details: ColorQueueItem): void {
  if (!details) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing color details',
    });
  }

  if (!details.submittedBy || typeof details.submittedBy !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing submittedBy',
    });
  }

  if (!details.submittedByEmail || typeof details.submittedByEmail !== 'string' || !details.submittedByEmail.includes('@')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing submittedByEmail',
    });
  }

  if (!details.name || typeof details.name !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing color name',
    });
  }

  // Code is optional, but if provided must be a string
  if (details.code && typeof details.code !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid color code format',
    });
  }
}
