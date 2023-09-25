import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );
  if (body.password === config.validation_key) {
    return await docClient
      .send(
        new PutCommand({
          TableName: 'MiniRegister',
          Item: { ...body.details },
        })
      )
      .catch((e) => console.log(e));
  } else {
    return { status: 403, message: 'NOT AUTHORIZED' };
  }
});
