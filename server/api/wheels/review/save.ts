import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
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
  try {
    updateImages(body.new, uuid).then(() => {
      _.forEach(body.new, (value, key) => {
        if (key !== 'images' && key !== 'inReview' && key !== 'uuid' && value !== '') {
          updateProperties({ key, value }, uuid);
        }
      });
      return deleteQueueItem();
    });
  } catch (error) {
    throw new Error(`Error saving approved changes - ${error}`);
  }

  return { response: 'wheel has been updated' };

  async function updateImages(newItem: any, uuid: string) {
    const objectItems = newItem.images.map((image: any) => {
      return { src: image, inReview: false };
    });
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
          ':location': objectItems,
          ':empty_list': [],
        },
      })
    );
  }

  async function updateProperties(newProp: { key: string; value: string }, uuid: string) {
    await docClient.send(
      new UpdateCommand({
        TableName: 'wheels',
        Key: { uuid: uuid },
        UpdateExpression: `set #newValue = :value`,
        ExpressionAttributeValues: {
          ':value': newProp.value,
        },
        ExpressionAttributeNames: {
          '#newValue': newProp.key,
        },
        ReturnValues: 'ALL_NEW',
      })
    );
  }

  async function deleteQueueItem() {
    return docClient.send(
      new DeleteCommand({
        TableName: 'wheelsQueue',
        Key: {
          uuid: uuid,
        },
      })
    );
  }
});
