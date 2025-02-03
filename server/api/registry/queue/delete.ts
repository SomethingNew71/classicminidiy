import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import type { RegistryItem } from '~/data/models/registry';

export default defineEventHandler(async (event): Promise<void> => {
  const config = useRuntimeConfig();
  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
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
      new DeleteCommand({
        TableName: 'MiniRegisterQueue',
        Key: {
          uniqueId: uuid,
          year: details.year,
        },
      })
    );
  } catch (error: any) {
    throw new Error(`Error deleting registry queue item - ${error?.message}`);
  }
});
