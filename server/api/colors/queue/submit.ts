import { PutCommand } from '@aws-sdk/lib-dynamodb';
import type { ColorQueueItem, ColorQueueSubmissionResponse } from '../../../../data/models/colors';
import { ColorItemStatus } from '../../../../data/models/colors';
import { v5 as uuidv5 } from 'uuid';
import { getDynamoDBClient, handleDynamoDBError } from '../../../utils/dynamodb';

const CMDIY_NAMESPACE = 'a48a62bf-fec1-4ed7-9381-a1bf2a08738c';

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_CODE_LENGTH = 50;
const MAX_YEARS_LENGTH = 50;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event): Promise<ColorQueueSubmissionResponse> => {
  const docClient = getDynamoDBClient();

  try {
    const { details } = await readBody<{ details: ColorQueueItem }>(event);

    // Trim and sanitize inputs
    sanitizeDetails(details);
    validateDetails(details);

    // Generate UUID with more entropy to prevent collisions
    details.id = uuidv5(`${details.submittedBy}-${details.submittedByEmail}-${Date.now()}-${Math.random()}`, CMDIY_NAMESPACE);
    details.status = ColorItemStatus.PENDING;
    details.hasSwatch = details.hasSwatch || false;

    await docClient.send(
      new PutCommand({
        TableName: 'colorsQueue',
        Item: { ...details },
      })
    );

    return {
      uuid: details.id,
      details,
    };
  } catch (error: any) {
    throw handleDynamoDBError(error, 'Color submission');
  }
});

function sanitizeDetails(details: ColorQueueItem): void {
  // Trim all string fields
  if (details.submittedBy) details.submittedBy = details.submittedBy.trim();
  if (details.submittedByEmail) details.submittedByEmail = details.submittedByEmail.trim().toLowerCase();
  if (details.name) details.name = details.name.trim();
  if (details.code) details.code = details.code.trim();
  if (details.shortCode) details.shortCode = details.shortCode.trim();
  if (details.ditzlerPpgCode) details.ditzlerPpgCode = details.ditzlerPpgCode.trim();
  if (details.duluxCode) details.duluxCode = details.duluxCode.trim();
  if (details.years) details.years = details.years.trim();
}

function validateDetails(details: ColorQueueItem): void {
  if (!details) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing color details',
    });
  }

  // Validate submittedBy
  if (!details.submittedBy || typeof details.submittedBy !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing submittedBy',
    });
  }
  if (details.submittedBy.length > MAX_NAME_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Name too long (max ${MAX_NAME_LENGTH} characters)`,
    });
  }

  // Validate email with proper regex
  if (!details.submittedByEmail || typeof details.submittedByEmail !== 'string' || !EMAIL_REGEX.test(details.submittedByEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing email address',
    });
  }
  if (details.submittedByEmail.length > MAX_EMAIL_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Email too long (max ${MAX_EMAIL_LENGTH} characters)`,
    });
  }

  // Validate color name
  if (!details.name || typeof details.name !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing color name',
    });
  }
  if (details.name.length > MAX_NAME_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Color name too long (max ${MAX_NAME_LENGTH} characters)`,
    });
  }

  // Validate optional code fields with length limits
  if (details.code && (typeof details.code !== 'string' || details.code.length > MAX_CODE_LENGTH)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid color code (max ${MAX_CODE_LENGTH} characters)`,
    });
  }
  if (details.shortCode && (typeof details.shortCode !== 'string' || details.shortCode.length > MAX_CODE_LENGTH)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid short code (max ${MAX_CODE_LENGTH} characters)`,
    });
  }
  if (details.ditzlerPpgCode && (typeof details.ditzlerPpgCode !== 'string' || details.ditzlerPpgCode.length > MAX_CODE_LENGTH)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid Ditzler/PPG code (max ${MAX_CODE_LENGTH} characters)`,
    });
  }
  if (details.duluxCode && (typeof details.duluxCode !== 'string' || details.duluxCode.length > MAX_CODE_LENGTH)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid Dulux code (max ${MAX_CODE_LENGTH} characters)`,
    });
  }
  if (details.years && (typeof details.years !== 'string' || details.years.length > MAX_YEARS_LENGTH)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid years field (max ${MAX_YEARS_LENGTH} characters)`,
    });
  }
}
