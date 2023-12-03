import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { v5 as uuidv5 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const params = getQuery(event);
  // const uniqueId = uuidv5(`${details.submittedBy}${details.name}${Math.random()}`, config.app.CMDIY_NAMEPSACE);

  // console.log('IMAGES BODY -------', body);
  console.log('IMAGES QUERY -------', params);

  // const docClient = DynamoDBDocumentClient.from(
  //   new DynamoDBClient({
  //     region: 'us-east-1',
  //     credentials: {
  //       accessKeyId: config.app.aws_access_key_id,
  //       secretAccessKey: config.app.aws_secret_access_key,
  //     },
  //   })
  // );

  // const s3Client = new S3Client({
  //   region: 'us-east-1',
  //   credentials: {
  //     accessKeyId: config.app.aws_access_key_id,
  //     secretAccessKey: config.app.aws_secret_access_key,
  //   },
  // });

  // const command = new PutObjectCommand({
  //   Bucket: 'classicminidiy',
  //   Key: 'hello-s3.txt',
  //   Body: 'Hello S3!',
  // });
});
