import type { IWheelsData } from '~/data/models/wheels';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v5 as uuidv5 } from 'uuid';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body: IWheelsData = await readBody(event);

  if (body.uuid === '' || body.newWheel) {
    body.uuid = uuidv5(`${body.userName}${body.name}${Math.random()}`, config.app.CMDIY_NAMEPSACE);
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

  try {
    await docClient.send(
      new PutCommand({
        TableName: 'wheelsQueue',
        Item: { ...body, images: [] },
      })
    );
    return { uuid: body.uuid };
  } catch (e) {
    console.error(e);
  }
});
