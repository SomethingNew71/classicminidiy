import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import _ from 'lodash';
import type { IWheelsData } from '~/data/models/wheels';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const uuid = body.wheel.new.uuid;
  const newWheel = body.wheel.new;

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  if (body.auth !== config.app.validation_key) {
    return { response: 'User is not authorized' };
  } else {
    try {
      if (newWheel.newWheel) {
        addNewWheel(newWheel).then(() => {
          deleteQueueItem();
        });
      } else if (newWheel.images && newWheel.images.length > 0) {
        updateImages(newWheel, uuid).then(() => {
          _.forEach(newWheel, (value, key) => {
            if (key !== 'images' && key !== 'inReview' && key !== 'uuid' && value !== '') {
              updateProperties({ key, value }, uuid);
            }
          });
          deleteQueueItem();
        });
      } else {
        _.forEach(newWheel, (value, key) => {
          if (key !== 'images' && key !== 'inReview' && key !== 'uuid' && value !== '') {
            updateProperties({ key, value }, uuid);
          }
        });
        deleteQueueItem();
      }
    } catch (error) {
      throw new Error(`Error saving approved changes - ${error}`);
    }
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

  async function addNewWheel(wheel: IWheelsData) {
    const parsedImages = await wheel.images?.map((image) => ({
      src: image,
      inReview: false,
    }));

    const parsedNewWheel = {
      uuid: wheel.uuid,
      name: wheel.name,
      type: wheel.type,
      width: wheel.width,
      size: wheel.size,
      offset: wheel.offset,
      notes: wheel.notes,
      userName: wheel.userName,
      inReview: false,
      emailAddress: wheel.emailAddress,
      referral: wheel.referral,
      images: parsedImages,
    };

    return await docClient
      .send(
        new PutCommand({
          TableName: 'wheels',
          Item: { ...parsedNewWheel },
        })
      )
      .catch((e) => console.log(e));
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
