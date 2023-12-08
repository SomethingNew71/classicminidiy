import { request } from '@octokit/request';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    return await request('GET /repos/{owner}/{repo}', {
      headers: {
        authorization: config.app.githubAPIKey,
      },
      owner: 'SomethingNew71',
      repo: 'MiniECUMaps',
    }).then(({ data }) => data);
  } catch (error) {
    throw new Error(`Error getting github repos - ${error}`);
  }
});
