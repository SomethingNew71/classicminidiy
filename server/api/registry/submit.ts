import { request } from '@octokit/request';
import outdent from 'outdent';
import { v5 as uuidv5 } from 'uuid';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { details } = await readBody(event);
  const CMDIY_NAMEPSACE = 'a48a62bf-fec1-4ed7-9381-a1bf2a08738c';
  const uniqueId = uuidv5(details.submittedBy, CMDIY_NAMEPSACE);
  return await request('POST /repos/SomethingNew71/classicminidiy/issues', {
    headers: {
      authorization: config.app.githubAPIKey,
      accept: 'application/vnd.github.v3+json',
    },
    title: `Registry ${details.year} - ${details.model}`,
    labels: ['Mini Register'],
    assignees: ['SomethingNew71'],
    body: outdent`
      ## New Details
        | Category    | Value                          |
        |-------------|--------------------------------|
        | Name        | ${details.submittedBy}         |
        | Email       | ${details.submittedByEmail}    |
        | Year        | ${details.year}                |
        | Model       | ${details.model}               |
        | Trim        | ${details.trim}                |
        | Body Type   | ${details.bodyType}            |
        | Engine Size | ${details.engineSize}          |
        | Color       | ${details.color}               |
        | Body #      | ${details.bodyNum}             |
        | Engine #    | ${details.engineNum}           |
        | Build Date  | ${details.buildDate}           |
        | Notes       | ${details.notes}               |
        | Unique ID   | ${uniqueId}                    |
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
