import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  type PutCommandOutput,
  type UpdateCommandOutput,
  type DeleteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import _ from 'lodash';
import type { IWheelsData } from '~/data/models/wheels';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const uuid = body.wheel.new.uuid;
  const newWheel: IWheelsData = body.wheel.new;

  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.dynamo_id,
        secretAccessKey: config.app.dynamo_key,
      },
    })
  );

  if (body.auth !== config.app.validation_key) {
    return { response: 'User is not authorized' };
  }

  try {
    if (newWheel.newWheel) {
      await addNewWheel(newWheel);
    } else {
      if (newWheel.images && newWheel.images.length > 0) {
        await updateImages(newWheel, uuid);
      }
      _.forEach(newWheel, (value, key) => {
        if (value && key !== 'images' && key !== 'inReview' && key !== 'uuid' && value !== '') {
          updateProperties({ key, value }, uuid);
        }
      });
    }
    deleteQueueItem();
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

  async function updateProperties(
    newProp: { key: string; value: string | true | any[] },
    uuid: string
  ): Promise<UpdateCommandOutput> {
    return await docClient.send(
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

  async function addNewWheel(wheel: IWheelsData): Promise<PutCommandOutput | void> {
    try {
      const parsedImages = wheel.images?.map((image) => ({
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

      return await docClient.send(
        new PutCommand({
          TableName: 'wheels',
          Item: { ...parsedNewWheel },
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteQueueItem(): Promise<DeleteCommandOutput> {
    return await docClient.send(
      new DeleteCommand({
        TableName: 'wheelsQueue',
        Key: {
          uuid: uuid,
        },
      })
    );
  }
});
