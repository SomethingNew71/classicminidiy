import { request } from '@octokit/request';
import type { GithubRawResponseRelease, IGithubReleaseParsedResponse, ReleaseItem } from '~/data/models/github';

export default defineEventHandler(async (): Promise<IGithubReleaseParsedResponse> => {
  const config = useRuntimeConfig();

  try {
    return await request('GET /repos/{owner}/{repo}/releases', {
      headers: { authorization: config.app.githubAPIKey },
      owner: 'SomethingNew71',
      repo: 'MiniECUMaps',
    }).then(({ data }): IGithubReleaseParsedResponse => {
      const parsed: IGithubReleaseParsedResponse = {
        latestRelease: data[0].tag_name || 'No releases',
        releases: data,
      };
      return parsed;
    });
  } catch (error) {
    throw new Error(`Error getting github releases - ${error}`);
  }
});
