import type { Color, PrettyColor } from '~/data/models/colors';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import type { RuntimeConfig } from 'nuxt/schema';

const createDynamoDBClient = (config: RuntimeConfig) => {
  return new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.app.aws_access_key_id,
      secretAccessKey: config.app.aws_secret_access_key,
    },
  });
};

export default defineEventHandler(async (event): Promise<PrettyColor> => {
  const config = useRuntimeConfig();
  const params = getQuery(event);
  const client = createDynamoDBClient(config);

  console.log('params', params);

  return await DynamoDBDocumentClient.from(client)
    .send(
      new GetCommand({
        TableName: 'colors',
        Key: {
          id: params.id,
          name: params.name,
        },
      })
    )
    .then(({ Item }) => {
      let parsedColor: PrettyColor;
      if (Item) {
        parsedColor = {
          pretty: {
            'Primary Color': Item.primaryColor,
            Code: Item.code,
            hasSwatch: Item.hasSwatch,
            'Ditzler PPG Code': Item.ditzlerPpgCode,
            'Dulux Code': Item.duluxCode,
            Name: Item.name,
            'Short Code': Item.shortCode,
            Years: Item.years,
            ID: Item.id,
          },
          raw: Item as Color,
        };
      } else {
        parsedColor = {
          pretty: {
            'Primary Color': '',
            Code: '',
            hasSwatch: false,
            'Ditzler PPG Code': '',
            'Dulux Code': '',
            Name: '',
            'Short Code': '',
            Years: '',
            ID: '',
          },
          raw: {
            primaryColor: '',
            code: '',
            imageSwatch: '',
            ditzlerPpgCode: '',
            duluxCode: '',
            name: '',
            shortCode: '',
            years: '',
            id: '',
            hasSwatch: false,
          },
        };
      }

      return parsedColor;
    })
    .catch((err) => {
      console.error(err);
      throw new Error('Error fetching wheel data');
    });
});
