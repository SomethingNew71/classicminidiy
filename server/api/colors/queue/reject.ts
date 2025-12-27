import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, type UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ColorItemStatus, type ColorQueueItem } from '../../../../data/models/colors';
import { requireAdminAuth } from '../../../utils/adminAuth';

export default defineEventHandler(async (event: any): Promise<UpdateCommandOutput> => {
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
    console.error(`Error rejecting color queue item: ${error.message}`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: `Error rejecting color queue item - ${error.message}`,
    });
  }
});
