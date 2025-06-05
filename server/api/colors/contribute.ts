import { request } from '@octokit/request';
import outdent from 'outdent';
import { z } from 'zod';
import { APIError } from '~/server/utils/api-utils';

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
    const colorData = colorSchema.parse(body.color);
    const newDetails = colorSchema.parse(body.newDetails);

    // Create GitHub issue
    const response = await request('POST /repos/SomethingNew71/classicminidiy/issues', {
      headers: {
        authorization: `token ${config.githubAPIKey}`,
        accept: 'application/vnd.github.v3+json',
      },
      title: `Update ${colorData.name} - ${colorData.code}`,
      labels: ['Color Update'],
      assignees: ['SomethingNew71'],
      body: outdent`
        ## Old Details
          | Category | Value                           |
          |----------|---------------------------------|
          | Name     | ${colorData.name}               |
          | Code     | ${colorData.code}               |
          | ShortCode| ${colorData.shortCode || 'N/A'} |
          | PPG      | ${colorData.ditzlerPpgCode || 'N/A'} |
          | Dulux    | ${colorData.duluxCode || 'N/A'} |
          | Years    | ${colorData.years || 'N/A'}     |
        ## New Details
          | Category | Value                           |
          |----------|---------------------------------|
          | Name     | ${newDetails.name}              |
          | Code     | ${newDetails.code}              |
          | ShortCode| ${newDetails.shortCode || 'N/A'} |
          | PPG      | ${newDetails.ditzlerPpgCode || 'N/A'} |
          | Dulux    | ${newDetails.duluxCode || 'N/A'} |
          | Years    | ${newDetails.years || 'N/A'}     |
      `,
    });

    return {
      number: response.data.number,
      url: response.data.html_url,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new APIError(400, 'Validation failed');
    }
    throw new APIError(500, `Failed to submit contribution: ${error.message}`);
  }
});
