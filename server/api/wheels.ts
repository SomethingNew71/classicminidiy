import { request } from '@octokit/request';
import outdent from 'outdent';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await request('POST /repos/SomethingNew71/classicminidiy/issues', {
    headers: {
      authorization: config.app.githubAPIKey,
      accept: 'application/vnd.github.v3+json',
    },
    title: `Update ${body.wheel.name}`,
    labels: ['Wheel Update'],
    assignees: ['SomethingNew71'],
    body: outdent`
      ## Old Details
        | Category      | Value                         |
        |---------------|-------------------------------|
        | Name          | ${body.wheel.name}            |
        | Offset        | ${body.wheel.offset}          |
        | Size          | ${body.wheel.size}            |
        | Major Size    | ${body.wheel.majorSize}       |
        | Type          | ${body.wheel.type}            |
        | Submitted By  | ${body.wheel.submittedBy}     |
        | Email Address | ${body.wheel.submittedByEmail}|
        | Notes         | ${body.wheel.notes}           |
      ## New Details
        | Category      | Value                              |
        |---------------|------------------------------------|
        | Name          | ${body.newDetails.name}            |
        | Offset        | ${body.newDetails.offset}          |
        | Size          | ${body.newDetails.size}            |
        | Major Size    | ${body.newDetails.majorSize}       |
        | Type          | ${body.newDetails.type}            |
        | Submitted By  | ${body.newDetails.submittedBy}     |
        | Email Address | ${body.newDetails.submittedByEmail}|
        | Notes         | ${body.newDetails.notes}           |
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
      throw new Error(`ERROR SUBMITTING WHEEL UPDATE ${error}`);
    });
});
