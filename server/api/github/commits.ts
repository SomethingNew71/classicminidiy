import { request } from '@octokit/request';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

export default defineEventHandler(async (): Promise<any> => {
  const config = useRuntimeConfig();
  try {
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
  } catch (error: any) {
    console.error(`Error getting GitHub commits: ${error?.message}`);
    throw new Error('Failed to fetch GitHub commits.');
  }
});
