import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import type { RegistryItem, RegistryQueueSubmissionResponse } from '~/data/models/registry';
import { v5 as uuidv5 } from 'uuid';
import { RegistryItemStatus } from '~/data/models/registry';

const CMDIY_NAMEPSACE = 'a48a62bf-fec1-4ed7-9381-a1bf2a08738c';

export default defineEventHandler(async (event): Promise<RegistryQueueSubmissionResponse> => {
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
    const { details } = await readBody<{ details: RegistryItem }>(event);
    validateDetails(details);
    details.uniqueId = uuidv5(details.submittedBy, CMDIY_NAMEPSACE);
    details.buildDate = '---';
    details.year = Number(details.year);
    details.status = RegistryItemStatus.PENDING;
    await docClient.send(
      new PutCommand({
        TableName: 'MiniRegisterQueue',
        Item: { ...details },
      })
    );

    return {
      uuid: details.uniqueId,
      details,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(`Error submitting to Queue - ${error?.message}`);
  }
});

function validateDetails(details: RegistryItem): void {
  if (!details || !details.submittedBy || !details.submittedByEmail || !details.year || !details.model) {
    throw new Error('Missing required details');
  }

  if (!details.submittedBy || typeof details.submittedBy !== 'string') {
    throw new Error('Invalid or missing submittedBy');
  }
  if (
    (!details.submittedByEmail || typeof details.submittedByEmail !== 'string') &&
    !details.submittedByEmail.includes('@')
  ) {
    throw new Error('Invalid or missing submittedByEmail');
  }
  if (!details.year || isNaN(Number(details.year))) {
    throw new Error('Invalid or missing year');
  }
  if (!details.model || typeof details.model !== 'string') {
    throw new Error('Invalid or missing model');
  }
}
