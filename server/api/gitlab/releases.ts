import { request } from '@octokit/request';
import axios from 'axios';
import type { IGithubParsedResponse } from '~/data/models/github';
import type { GitlabRelease } from '~/data/models/gitlab';

export default defineEventHandler(async (event): Promise<GitlabRelease[]> => {
  const config = useRuntimeConfig();
  const gitlabUrl = 'https://gitlab.com/api/v4/projects/62149598/releases';

  try {
    return await axios
      .get(gitlabUrl, {
        headers: {
          Authorization: `Bearer ${config.GITLAB}`,
          'PRIVATE-TOKEN': `${config.GITLAB}`,
        },
      })
      .then(({ data }) => data);
  } catch (error) {
    throw new Error(`Error getting github releases - ${error}`);
  }
});
