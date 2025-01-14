import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  let body;
  try {
    body = await readBody(event);
  } catch (error: any) {
    throw new Error(`Error reading request body - ${error?.message}`);
  }

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  if (body.password === config.app.validation_key) {
    body.details.buildDate = '---';
    return await docClient
      .send(
        new PutCommand({
          TableName: 'MiniRegister',
          Item: { ...body.details },
        })
      )
      .catch((e: any) => {
        console.error(e);
        throw new Error(`Error saving to DynamoDB - ${e?.message}`);
      });
  } else {
    return { status: 403, message: 'NOT AUTHORIZED' };
  }
});
