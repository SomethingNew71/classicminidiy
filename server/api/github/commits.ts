import { request } from '@octokit/request';
import * as _ from 'lodash';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  return await request('GET /repos/{owner}/{repo}/commits', {
    headers: {
      authorization: config.app.githubAPIKey,
    },
    owner: 'SomethingNew71',
    repo: 'MiniECUMaps',
  })
    .then(async (response) => ({ ...response.data }))
    .catch((error) => {
      throw new Error(error);
    });
});
