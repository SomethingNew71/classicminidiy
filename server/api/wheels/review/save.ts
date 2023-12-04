import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import _ from 'lodash';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const uuid = body.new.uuid;

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  updateImages(body.new, uuid).then(() => {
    _.forEach(body.new, (value, key) => {
      if (key !== 'images' && key !== 'inReview' && key !== 'uuid' && value !== '') {
        updateProperties({ key, value }, uuid);
      }
    });
  });

  async function updateImages(newItem: any, uuid: string) {
    return await docClient.send(
      new UpdateCommand({
        TableName: 'wheels',
        Key: { uuid: uuid },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set #images = list_append(if_not_exists(#images, :empty_list), :location)',
        ExpressionAttributeNames: {
          '#images': 'images',
        },
        ExpressionAttributeValues: {
          ':location': newItem.images,
          ':empty_list': [],
        },
      })
    );
  }

  async function updateProperties(newProp: { key: string; value: string }, uuid: string) {
    const propertyString = `#${newProp.key}`;
    await docClient.send(
      new UpdateCommand({
        TableName: 'wheels',
        Key: { uuid: uuid },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: `set #${propertyString} = :value`,
        ExpressionAttributeValues: {
          ':value': newProp.value,
        },
      })
    );
  }
});
