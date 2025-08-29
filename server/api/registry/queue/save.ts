import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { RegistryItem } from '../../../../data/models/registry';
import { RegistryItemStatus } from '../../../../data/models/registry';
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
      issueNumber: string | number;
      details: RegistryItem;
    }>(event);

    await docClient.send(
      new PutCommand({
        TableName: 'MiniRegister',
        Item: { ...details },
      })
    );

    await docClient.send(
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
          ':itemStatus': RegistryItemStatus.APPROVED,
        },
      })
    );
  } catch (error: any) {
    throw new Error(`Error saving registry info - ${error?.message}`);
  }
});
