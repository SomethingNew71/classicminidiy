import { S3Client, GetObjectAclCommand } from '@aws-sdk/client-s3';

export default defineEventHandler((event) => {
  const client = new S3Client({ region: 'us-east-1' });
  const params = {
    /** input parameters */
  };
  const command = new GetObjectAclCommand({
    Bucket: 'colorswatchimages',
    Key: 'kvRN5gZt467r1gYG+3TFdOPAPV04a/P+vje3kLYF',
  });
  client.send(command).then((res) => {
    console.log(res);
  });
  return {};
});
