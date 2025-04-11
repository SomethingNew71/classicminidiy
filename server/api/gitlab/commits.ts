import { request } from '@octokit/request';
import axios from 'axios';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import type { GitlabCommit } from '~/data/models/gitlab';

export default defineEventHandler(async (event): Promise<GitlabCommit[]> => {
  const config = useRuntimeConfig();
  const gitlabUrl = 'https://gitlab.com/api/v4/projects/62149598/repository/commits';
  try {
    return await axios
      .get(gitlabUrl, {
        headers: {
          Authorization: `Bearer ${config.GITLAB}`,
          'PRIVATE-TOKEN': `${config.GITLAB}`,
        },
      })
      .then(({ data }) => {
        let commits: GitlabCommit[] = data;
        return commits.map((item) => {
          const date = item.committed_date;
          return {
            ...item,
            parsedCommitDate: date ? DateTime.fromISO(date).toFormat('LLL dd') : 'Missing',
          };
        });
      });
  } catch (error) {
    throw new Error(`Error getting github releases - ${error}`);
  }
});
