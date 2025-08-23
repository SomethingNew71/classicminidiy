import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Singleton pattern for DynamoDB client to enable connection reuse
let dynamoClient: DynamoDBDocumentClient | null = null;

export function getDynamoDBClient(): DynamoDBDocumentClient {
  if (!dynamoClient) {
    const config = useRuntimeConfig();

    const client = new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.dynamo_id,
        secretAccessKey: config.dynamo_key,
      },
      // Connection pooling and optimization settings
      maxAttempts: 3,
      retryMode: 'adaptive',
      requestHandler: {
        // Keep connections alive for better performance
        keepAlive: true,
        // Reasonable timeout
        timeoutInMs: 5000,
        // Maximum concurrent connections
        maxConcurrency: 50,
      },
    });

    // Create document client with optimized settings
    dynamoClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        // Only marshall values that are explicitly undefined
        convertEmptyValues: false,
        // Remove undefined attributes from items
        removeUndefinedValues: true,
        // Convert classless objects to maps
        convertClassInstanceToMap: false,
      },
      unmarshallOptions: {
        // Return numbers as numbers instead of NumberValue
        wrapNumbers: false,
      },
    });
  }

  return dynamoClient;
}

export interface DynamoDBQueryOptions {
  timeout?: number;
  retries?: number;
}

export function createTimeoutPromise<T>(timeout: number = 5000): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('DynamoDB request timed out')), timeout);
  });
}

export async function withTimeout<T>(operation: Promise<T>, timeout: number = 5000): Promise<T> {
  return Promise.race([operation, createTimeoutPromise<T>(timeout)]);
}

export function handleDynamoDBError(error: any, operation: string = 'DynamoDB operation') {
  console.error(`${operation} error:`, error);

  if (error.name === 'TimeoutError' || error.message?.includes('timed out')) {
    return createError({
      statusCode: 504,
      statusMessage: 'Database request timed out',
    });
  } else if (error.name === 'ValidationException') {
    return createError({
      statusCode: 400,
      statusMessage: `Invalid request: ${error.message}`,
    });
  } else if (error.name === 'ResourceNotFoundException') {
    return createError({
      statusCode: 404,
      statusMessage: 'Resource not found',
    });
  } else if (error.name === 'ConditionalCheckFailedException') {
    return createError({
      statusCode: 409,
      statusMessage: 'Conditional check failed',
    });
  } else if (error.name === 'ProvisionedThroughputExceededException') {
    return createError({
      statusCode: 429,
      statusMessage: 'Request rate too high, please try again later',
    });
  } else if (error.statusCode) {
    // If we already created an error with createError, just rethrow it
    throw error;
  } else {
    return createError({
      statusCode: 500,
      statusMessage: `${operation} failed: ${error.message || 'Unknown error'}`,
    });
  }
}
