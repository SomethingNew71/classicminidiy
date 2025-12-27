import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { ColorQueueItem, Color } from '../../../../data/models/colors';
import { ColorItemStatus } from '../../../../data/models/colors';
import { requireAdminAuth } from '../../../utils/adminAuth';

export default defineEventHandler(async (event: any) => {
  // Require admin authentication
  await requireAdminAuth(event);

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
    const { uuid, details } = await readBody<{
      uuid: string;
      details: ColorQueueItem;
    }>(event);

    // Create the color object for the colors table (without queue-specific fields)
    const colorData: Color = {
      id: details.originalColorId || details.id,
      name: details.name,
      code: details.code,
      shortCode: details.shortCode || '',
      ditzlerPpgCode: details.ditzlerPpgCode || '',
      duluxCode: details.duluxCode || '',
      years: details.years || '',
      primaryColor: details.primaryColor || '',
      imageSwatch: details.imageSwatch || '',
      hasSwatch: details.hasSwatch || false,
      images: details.images || [],
    };

    // Insert/update the color in the colors table
    await docClient.send(
      new PutCommand({
        TableName: 'colors',
        Item: { ...colorData },
      })
    );

    // Update the status in the queue to APPROVED
    await docClient.send(
      new UpdateCommand({
        TableName: 'colorsQueue',
        Key: {
          id: uuid,
        },
        UpdateExpression: 'set #itemStatus = :itemStatus',
        ExpressionAttributeNames: {
          '#itemStatus': 'status',
        },
        ExpressionAttributeValues: {
          ':itemStatus': ColorItemStatus.APPROVED,
        },
      })
    );

    return { response: 'color has been approved' };
  } catch (error: any) {
    console.error('Error saving color:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: `Error saving color - ${error?.message}`,
    });
  }
});
