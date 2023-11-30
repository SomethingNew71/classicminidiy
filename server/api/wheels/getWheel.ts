import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.app.aws_access_key_id,
      secretAccessKey: config.app.aws_secret_access_key,
    },
  });
  const docClient = DynamoDBDocumentClient.from(client);
  const command = new GetCommand({
    TableName: 'wheels',
    Key: {
      uuid: query.uuid,
    },
  });

  const response = await docClient.send(command).then((res) => res.Item);
  return response;
});
