import { request } from '@octokit/request';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  return await request('GET /repos/{owner}/{repo}/releases', {
    headers: {
      authorization: config.app.githubAPIKey,
    },
    owner: 'SomethingNew71',
    repo: 'MiniECUMaps',
  })
    .then(async (response) => ({
      latestRelease: response.data[0].tag_name,
      releases: response.data,
    }))
    .catch((error) => {
      throw new Error(error);
    });
});
