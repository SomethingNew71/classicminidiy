import { PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { ColorQueueItem, Color, ColorSaveResponse } from '../../../../data/models/colors';
import { ColorItemStatus } from '../../../../data/models/colors';
import { requireAdminAuth } from '../../../utils/adminAuth';
import { getDynamoDBClient, handleDynamoDBError } from '../../../utils/dynamodb';

export default defineEventHandler(async (event): Promise<ColorSaveResponse> => {
  // Require admin authentication
  await requireAdminAuth(event);

  const docClient = getDynamoDBClient();

  try {
    const { uuid, details } = await readBody<{
      uuid: string;
      details: ColorQueueItem;
    }>(event);

    if (!uuid || typeof uuid !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid or missing uuid',
      });
    }

    if (!details || !details.name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid or missing color details',
      });
    }

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

    // Step 1: Insert/update the color in the colors table
    await docClient.send(
      new PutCommand({
        TableName: 'colors',
        Item: { ...colorData },
      })
    );

    // Step 2: Update the status in the queue to APPROVED
    try {
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
    } catch (queueError: any) {
      // If queue update fails, we need to rollback the color insertion
      // to maintain consistency
      console.error('Queue update failed, rolling back color insertion:', queueError);
      try {
        await docClient.send(
          new DeleteCommand({
            TableName: 'colors',
            Key: { id: colorData.id },
          })
        );
      } catch (rollbackError) {
        console.error('Rollback failed - inconsistent state:', { colorId: colorData.id, queueId: uuid, rollbackError });
      }
      throw queueError;
    }

    return { success: true, message: 'Color has been approved', colorId: colorData.id };
  } catch (error: any) {
    throw handleDynamoDBError(error, 'Color approval');
  }
});
