import { chassisRanges } from '../../../data/models/decoders';
import { requireMcpAuth } from '../../utils/mcpAuth';

// Import the actual chassis decoder validation function from the existing API
// This avoids code duplication and ensures consistency
type ChassisDecoderRequest = {
  yearRange: string;
  chassisNumber: string;
};

/**
 * Call the existing chassis decoder API internally
 * This ensures we use the same validation logic as the main decoder endpoint
 */
const callChassisDecoderAPI = async (yearRange: string, chassisNumber: string) => {
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const endpoint = `${apiUrl}/api/decoders/chassis`;

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      yearRange,
      chassisNumber,
    } as ChassisDecoderRequest),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Chassis decoder API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return await response.json();
};

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  }

  // Require authentication
  requireMcpAuth(event);

  try {
    const body = await readBody(event);

    // Validate required parameters
    const { yearRange, chassisNumber } = body;

    // Validate inputs
    if (!yearRange || typeof yearRange !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing or invalid parameter: yearRange must be a string',
      });
    }

    if (!chassisNumber || typeof chassisNumber !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing or invalid parameter: chassisNumber must be a string',
      });
    }

    // Security: Limit input lengths to prevent abuse
    if (chassisNumber.length > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Chassis number too long (maximum 50 characters)',
      });
    }

    if (yearRange.length > 20) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Year range too long (maximum 20 characters)',
      });
    }

    // Validate chassis number contains only allowed characters
    if (!/^[A-Za-z0-9\-\s\/]+$/.test(chassisNumber)) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Chassis number contains invalid characters. Only letters, numbers, hyphens, spaces, and forward slashes are allowed',
      });
    }

    // Find the matching chassis range for validation
    const selectedRange = chassisRanges.find((range) => range.title === yearRange);

    if (!selectedRange) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid year range: ${yearRange}. Valid ranges are: ${chassisRanges.map((r) => r.title).join(', ')}`,
      });
    }

    // Call the existing chassis decoder API internally
    const decoderResponse = await callChassisDecoderAPI(yearRange, chassisNumber);

    // Format the response for MCP with human-readable context
    const result = {
      success: decoderResponse.success,
      inputs: {
        yearRange: decoderResponse.yearRange,
        chassisNumber: decoderResponse.chassisNumber,
      },
      results: {
        isValid: decoderResponse.isValid,
        pattern: decoderResponse.pattern,
        decodedPositions: decoderResponse.decodedPositions,
      },
      context: {
        yearRange: decoderResponse.yearRange,
        expectedPattern: decoderResponse.pattern,
        validationStatus: decoderResponse.isValid ? 'Valid chassis number' : 'Invalid chassis number',
        errors: decoderResponse.errors,
      },
      humanReadable: {
        summary: `Chassis number ${decoderResponse.chassisNumber} for ${decoderResponse.yearRange} range is ${decoderResponse.isValid ? 'VALID' : 'INVALID'}`,
        breakdown: decoderResponse.decodedPositions
          .map((pos: any) => `Position ${pos.position}: "${pos.value}" = ${pos.name} ${pos.matched ? '✓' : '✗'}`)
          .join('\n'),
        errors: decoderResponse.errors.length > 0 ? decoderResponse.errors.join('; ') : 'No errors',
      },
    };

    // Set cache headers (24 hours for decoder logic)
    setHeader(event, 'Cache-Control', 'public, max-age=86400');

    return result;
  } catch (error: any) {
    console.error('Chassis decoder MCP error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error decoding chassis number',
    });
  }
});
