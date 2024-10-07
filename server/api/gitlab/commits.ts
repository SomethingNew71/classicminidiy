import { request } from '@octokit/request';
import axios from 'axios';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const gitlabUrl = 'https://gitlab.com/api/v4/projects/miniecumaps/repository/commits';

  console.log('AUTH ', config.app.GITLAB);

  try {
    return await axios
      .get(gitlabUrl, {
        headers: {
          Authorization: `Bearer ${config.app.GITLAB}`,
        },
      })
      .then((response) => {
        console.log('GITLAB RES', response);
      });

    return await request('GET /repos/{owner}/{repo}/commits', {
      headers: {
        authorization: config.app.githubAPIKey,
      },
      owner: 'SomethingNew71',
      repo: 'MiniECUMaps',
    }).then(({ data }) => {
      return data.map((item) => {
        const date = item?.commit?.committer?.date;
        return {
          ...item,
          date: date ? DateTime.fromISO(date).toFormat('LLL dd') : 'Missing',
        };
      });
    });
  } catch (error) {
    throw new Error(`Error getting github releases - ${error}`);
  }
});
