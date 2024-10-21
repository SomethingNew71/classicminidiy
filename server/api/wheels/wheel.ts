import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import type { IWheelsData } from '~/data/models/wheels';

export default defineEventHandler(async (event): Promise<IWheelsData> => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.app.aws_access_key_id,
      secretAccessKey: config.app.aws_secret_access_key,
    },
  });
  return await DynamoDBDocumentClient.from(client)
    .send(
      new GetCommand({
        TableName: 'wheels',
        Key: {
          uuid: query.uuid,
        },
      })
    )
    .then(({ Item }) => Item as IWheelsData)
    .catch((err) => {
      console.error(err);
      throw new Error('Error fetching wheel data');
    });
});
