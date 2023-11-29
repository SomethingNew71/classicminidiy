import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

export default defineEventHandler(async () => {
  const allWheels = [];
  const config = useRuntimeConfig();
  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  const getMembers = async (_key: any) => {
    const scanCommand = new ScanCommand({
      TableName: 'wheels',
      Limit: 25,
      ExclusiveStartKey: _key,
    });
    const results = await docClient.send(scanCommand);
    allWheels.push(results.Items);
    return results.LastEvaluatedKey;
  };
  try {
    let key;
    do {
      key = await getMembers(key);
    } while (typeof key !== 'undefined');
    return allWheels;
  } catch (error) {
    throw new Error(error);
  }
});
