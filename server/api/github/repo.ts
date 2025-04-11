import { request } from '@octokit/request';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    return await request('GET /repos/{owner}/{repo}', {
      headers: {
        authorization: config.githubAPIKey,
      },
      owner: 'SomethingNew71',
      repo: 'MiniECUMaps',
    }).then(({ data }) => data);
  } catch (error: any) {
    console.error(`Error getting GitHub repo: ${error?.message}`);
    throw new Error('Failed to fetch GitHub repository information.');
  }
});
