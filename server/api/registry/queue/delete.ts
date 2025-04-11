import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, type DeleteCommandOutput } from '@aws-sdk/lib-dynamodb';
import type { RegistryItem } from '~/data/models/registry';

export default defineEventHandler(async (event: any): Promise<DeleteCommandOutput> => {
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
    const { uuid, details, auth } = await readBody<{
      uuid: string;
      issueNumber: string | number;
      details: RegistryItem;
      auth: string;
    }>(event);

    console.log('Deleting registry queue item:', auth);
    console.log('Deleting registry queue item:', config.validation_key);
    console.log('Deleting registry queue item:', auth === config.validation_key);

    if (auth === config.validation_key) {
      return await docClient.send(
        new DeleteCommand({
          TableName: 'MiniRegisterQueue',
          Key: {
            uniqueId: uuid,
            year: details.year,
          },
        })
      );
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error: any) {
    console.error(`Error deleting registry queue item: ${error.message}`, error);
    throw new Error(`Error deleting registry queue item - ${error.message}`);
  }
});
