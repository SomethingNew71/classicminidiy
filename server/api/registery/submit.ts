import { request } from '@octokit/request';
import outdent from 'outdent';
import { v5 as uuidv5 } from 'uuid';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const CMDIY_NAMEPSACE = 'a48a62bf-fec1-4ed7-9381-a1bf2a08738c';
  const uniqueId = uuidv5(body.details.submittedBy, CMDIY_NAMEPSACE);
  return await request('POST /repos/SomethingNew71/classicminidiy/issues', {
    headers: {
      authorization: config.app.githubAPIKey,
      accept: 'application/vnd.github.v3+json',
    },
    title: `Registry ${body.details.year} - ${body.details.model}`,
    labels: ['Mini Register'],
    assignees: ['SomethingNew71'],
    body: outdent`
      ## New Details
        | Category    | Value                          |
        |-------------|--------------------------------|
        | Year        | ${body.details.year}           |
        | Model       | ${body.details.model}          |
        | Trim        | ${body.details.trim}           |
        | Body Type   | ${body.details.bodyType}       |
        | Engine Size | ${body.details.engineSize}     |
        | Color       | ${body.details.color}          |
        | Body #      | ${body.details.bodyNum}        |
        | Engine #    | ${body.details.engineNum}      |
        | Build Date  | ${body.details.buildDate}      |
        | Notes       | ${body.details.notes}          |
        | Unique ID   | ${uniqueId}                    |
      ## Submitted by:
      - Name: ${body.newDetails.submittedBy}
      - Email: ${body.newDetails.submittedByEmail}
      `,
  })
    .then(async (response) => {
      return {
        number: await response.data.number,
        url: await response.data.html_url,
      };
    })
    .catch((error) => {
      throw new Error(error);
    });
});
