import { UpdateCommand, type UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ColorItemStatus, type ColorQueueItem } from '../../../../data/models/colors';
import { requireAdminAuth } from '../../../utils/adminAuth';
import { getDynamoDBClient, handleDynamoDBError } from '../../../utils/dynamodb';

export default defineEventHandler(async (event): Promise<UpdateCommandOutput> => {
  // Require admin authentication
  await requireAdminAuth(event);

  const docClient = getDynamoDBClient();

  try {
    const { uuid } = await readBody<{
      uuid: string;
      details: ColorQueueItem;
    }>(event);

    if (!uuid || typeof uuid !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid or missing uuid',
      });
    }

    return await docClient.send(
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
          ':itemStatus': ColorItemStatus.REJECTED,
        },
      })
    );
  } catch (error: any) {
    throw handleDynamoDBError(error, 'Color rejection');
  }
});
