import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, type DeleteCommandOutput } from '@aws-sdk/lib-dynamodb';
import { RegistryItemStatus, type RegistryItem } from '../../../../data/models/registry';
import { requireAdminAuth } from '../../../utils/adminAuth';

export default defineEventHandler(async (event: any): Promise<DeleteCommandOutput> => {
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
      issueNumber: string | number;
      details: RegistryItem;
    }>(event);

    return await docClient.send(
      new UpdateCommand({
        TableName: 'MiniRegisterQueue',
        Key: {
          uniqueId: uuid,
          year: details.year,
        },
        UpdateExpression: 'set #itemStatus = :itemStatus',
        ExpressionAttributeNames: {
          '#itemStatus': 'status',
        },
        ExpressionAttributeValues: {
          ':itemStatus': RegistryItemStatus.REJECTED,
        },
      })
    );
  } catch (error: any) {
    console.error(`Error rejecting registry queue item: ${error.message}`, error);
    throw new Error(`Error rejecting registry queue item - ${error.message}`);
  }
});
