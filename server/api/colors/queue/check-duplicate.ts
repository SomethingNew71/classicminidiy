import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { Color } from '../../../../data/models/colors';
import { getDynamoDBClient, withTimeout, handleDynamoDBError } from '../../../utils/dynamodb';

interface DuplicateCheckRequest {
  name: string;
  code: string;
}

interface DuplicateCheckResponse {
  hasDuplicates: boolean;
  matches: Color[];
}

export default defineEventHandler(async (event): Promise<DuplicateCheckResponse> => {
  const docClient = getDynamoDBClient();

  try {
    const { name, code } = await readBody<DuplicateCheckRequest>(event);

    if (!name && !code) {
      return {
        hasDuplicates: false,
        matches: [],
      };
    }

    // Fetch all colors and check for duplicates
    const scanCommand = new ScanCommand({
      TableName: 'colors',
    });

    const result = await withTimeout(docClient.send(scanCommand), 5000);
    const allColors = (result.Items as Color[]) || [];

    // Normalize search terms for comparison
    const normalizedName = name?.toLowerCase().trim() || '';
    const normalizedCode = code?.toLowerCase().trim() || '';

    // Find matches based on name or code similarity
    const matches = allColors.filter((color) => {
      const colorName = color.name?.toLowerCase().trim() || '';
      const colorCode = color.code?.toLowerCase().trim() || '';
      const colorShortCode = color.shortCode?.toLowerCase().trim() || '';

      // Exact match on code
      if (normalizedCode && (colorCode === normalizedCode || colorShortCode === normalizedCode)) {
        return true;
      }

      // Exact match on name
      if (normalizedName && colorName === normalizedName) {
        return true;
      }

      // Fuzzy match on name (contains or similar)
      if (normalizedName && normalizedName.length >= 3) {
        // Check if names are very similar (one contains the other)
        if (colorName.includes(normalizedName) || normalizedName.includes(colorName)) {
          return true;
        }
      }

      return false;
    });

    // Limit to top 5 matches
    const topMatches = matches.slice(0, 5);

    return {
      hasDuplicates: topMatches.length > 0,
      matches: topMatches,
    };
  } catch (error: any) {
    console.error('Error checking for duplicate colors:', error);
    throw handleDynamoDBError(error, 'Check duplicate colors');
  }
});
