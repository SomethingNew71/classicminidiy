import { request } from '@octokit/request';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  return await request('GET /repos/{owner}/{repo}', {
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
