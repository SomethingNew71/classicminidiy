import { request } from '@octokit/request';
import type { IGithubParsedResponse } from '~/data/models/github';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    return await request('GET /repos/{owner}/{repo}/releases', {
      headers: {
        authorization: config.app.githubAPIKey,
      },
      owner: 'SomethingNew71',
      repo: 'MiniECUMaps',
    }).then(
      (response): IGithubParsedResponse => ({
        latestRelease: response.data[0].tag_name,
        releases: response.data,
      })
    );
  } catch (error) {
    throw new Error(`Error getting github releases - ${error}`);
  }
});
