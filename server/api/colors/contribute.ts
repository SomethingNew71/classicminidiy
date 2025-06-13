import { request } from '@octokit/request';
import outdent from 'outdent';
import { z } from 'zod';
// No need for APIError as we'll use Nuxt's createError

// Define validation schemas
const colorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  shortCode: z.string().optional(),
  ditzlerPpgCode: z.string().optional(),
  duluxCode: z.string().optional(),
  years: z.string().optional(),
  imageSwatch: z.string().url('Must be a valid URL').optional(),
  primaryColor: z.string().optional(),
  hasSwatch: z.boolean().default(false),
  id: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    // Validate input
    const colorData = colorSchema.safeParse(body.color);
    const newDetails = colorSchema.safeParse(body.newDetails);

    // Handle validation errors with detailed feedback
    if (!colorData.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid color data',
        data: colorData.error.format(),
      });
    }

    if (!newDetails.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid new details',
        data: newDetails.error.format(),
      });
    }

    // Create a promise that will reject after timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('GitHub API request timed out')), 8000);
    });

    // Race between the actual request and the timeout
    const response = await Promise.race([
      request('POST /repos/SomethingNew71/classicminidiy/issues', {
        headers: {
          authorization: `token ${config.githubAPIKey}`,
          accept: 'application/vnd.github.v3+json',
        },
        title: `Update ${colorData.data.name} - ${colorData.data.code}`,
        labels: ['Color Update'],
        assignees: ['SomethingNew71'],
        body: outdent`
          ## Old Details
            | Category | Value                           |
            |----------|---------------------------------|
            | Name     | ${colorData.data.name}               |
            | Code     | ${colorData.data.code}               |
            | ShortCode| ${colorData.data.shortCode || 'N/A'} |
            | PPG      | ${colorData.data.ditzlerPpgCode || 'N/A'} |
            | Dulux    | ${colorData.data.duluxCode || 'N/A'} |
            | Years    | ${colorData.data.years || 'N/A'}     |
          ## New Details
            | Category | Value                           |
            |----------|---------------------------------|
            | Name     | ${newDetails.data.name}              |
            | Code     | ${newDetails.data.code}              |
            | ShortCode| ${newDetails.data.shortCode || 'N/A'} |
            | PPG      | ${newDetails.data.ditzlerPpgCode || 'N/A'} |
            | Dulux    | ${newDetails.data.duluxCode || 'N/A'} |
            | Years    | ${newDetails.data.years || 'N/A'}     |
        `,
        request: {
          timeout: 8000, // 8 second timeout
        },
      }),
      timeoutPromise,
    ]);

    return {
      number: (response as any).data.number,
      url: (response as any).data.html_url,
    };
  } catch (error: any) {
    console.error('Error submitting color contribution:', error);

    // Handle different error types
    if (error.statusCode) {
      // If we already created an error with createError, just rethrow it
      throw error;
    } else if (error.status) {
      throw createError({
        statusCode: error.status,
        statusMessage: `GitHub API error: ${error.message || 'Unknown error'}`,
      });
    } else if (error.message?.includes('timed out')) {
      throw createError({
        statusCode: 504,
        statusMessage: 'GitHub API request timed out',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to submit contribution: ${error.message || 'Unknown error'}`,
      });
    }
  }
});
