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
import type { IWheelsData } from '../../../../data/models/wheels';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const body = await readBody(event);

    // Input validation
    if (!body || typeof body !== 'object') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body',
      });
    }

    if (!body.wheel?.new?.uuid) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required wheel uuid',
      });
    }

    if (body.auth !== config.validation_key) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User is not authorized',
      });
    }

    const uuid = body.wheel.new.uuid;
    const newWheel: IWheelsData = body.wheel.new;

    const docClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: config.dynamo_id,
          secretAccessKey: config.dynamo_key,
        },
      })
    );

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
    await deleteQueueItem();

    return { response: 'wheel has been updated' };

    async function updateImages(newItem: any, uuid: string) {
      const objectItems = newItem.images.map((image: any) => {
        return { src: image, inReview: false };
      });

      // Create a promise that will reject after timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
      });

      return await Promise.race([
        docClient.send(
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
        ),
        timeoutPromise,
      ]);
    }

    async function updateProperties(
      newProp: { key: string; value: string | number | true | any[] },
      uuid: string
    ): Promise<UpdateCommandOutput> {
      // Create a promise that will reject after timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
      });

      return await Promise.race([
        docClient.send(
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
        ),
        timeoutPromise,
      ]);
    }

    async function addNewWheel(wheel: IWheelsData): Promise<PutCommandOutput | void> {
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

      // Create a promise that will reject after timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
      });

      return await Promise.race([
        docClient.send(
          new PutCommand({
            TableName: 'wheels',
            Item: { ...parsedNewWheel },
          })
        ),
        timeoutPromise,
      ]);
    }

    async function deleteQueueItem(): Promise<DeleteCommandOutput> {
      // Create a promise that will reject after timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('DynamoDB request timed out')), 5000);
      });

      return await Promise.race([
        docClient.send(
          new DeleteCommand({
            TableName: 'wheelsQueue',
            Key: {
              uuid: uuid,
            },
          })
        ),
        timeoutPromise,
      ]);
    }
  } catch (error: any) {
    console.error('Error saving approved wheel changes:', error);

    if (error.statusCode) {
      throw error; // Already a formatted error
    } else if (error.name === 'TimeoutError' || error.message?.includes('timed out')) {
      throw createError({
        statusCode: 504,
        statusMessage: 'Database request timed out',
      });
    } else if (error.name === 'ValidationException') {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid request: ${error.message}`,
      });
    } else if (error.name === 'ResourceNotFoundException') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Wheels table not found',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Error saving approved wheel changes: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
