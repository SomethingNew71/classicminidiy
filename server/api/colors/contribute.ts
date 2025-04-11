import { request } from '@octokit/request';
import outdent from 'outdent';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  return await request('POST /repos/SomethingNew71/classicminidiy/issues', {
    headers: {
      authorization: config.githubAPIKey,
      accept: 'application/vnd.github.v3+json',
    },
    title: `Update ${body.color.name} - ${body.color.code}`,
    labels: ['Color Update'],
    assignees: ['SomethingNew71'],
    body: outdent`
      ## Old Details
        | Category | Value                           |
        |----------|---------------------------------|
        | Name     | ${body.color.name}          |
        | Code     | ${body.color.code}          |
        | ShortCode| ${body.color.shortCode}     |
        | PPG      | ${body.color.ditzlerPpgCode}|
        | Dulux    | ${body.color.duluxCode}     |
        | Years    | ${body.color.years}         |
      ## New Details
        | Category | Value                                |
        |----------|--------------------------------------|
        | Name     | ${body.newDetails.name}          |
        | Code     | ${body.newDetails.code}          |
        | ShortCode| ${body.newDetails.shortCode}     |
        | PPG      | ${body.newDetails.ditzlerPpgCode}|
        | Dulux    | ${body.newDetails.duluxCode}     |
        | Years    | ${body.newDetails.years}         |
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
