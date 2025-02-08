import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import type { RuntimeConfig } from 'nuxt/schema';
import type { IWheelsData } from '~/data/models/wheels';

const createDynamoDBClient = (config: RuntimeConfig) => {
  return new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.app.aws_access_key_id,
      secretAccessKey: config.app.aws_secret_access_key,
    },
  });
};

export default defineEventHandler(async (event): Promise<IWheelsData> => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const client = createDynamoDBClient(config);
  return await DynamoDBDocumentClient.from(client)
    .send(
      new GetCommand({
        TableName: 'wheels',
        Key: {
          uuid: query.uuid,
        },
      })
    )
    .then(({ Item }) => {
      if (Item?.notes) {
        Item.notes = Item.notes.replace(/<\/?[^>]+(>|$)/g, '');
      }
      return Item as IWheelsData;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error fetching wheel data');
    });
});
