import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import type { RegistryItem, RegistryQueueSubmissionResponse } from '~/data/models/registry';
import { v5 as uuidv5 } from 'uuid';
import { Octokit } from '@octokit/core';
import outdent from 'outdent';

const CMDIY_NAMEPSACE = 'a48a62bf-fec1-4ed7-9381-a1bf2a08738c';

export default defineEventHandler(async (event): Promise<RegistryQueueSubmissionResponse> => {
  const config = useRuntimeConfig();
  const octokit = new Octokit({ auth: config.app.githubAPIKey });
  const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.app.aws_access_key_id,
        secretAccessKey: config.app.aws_secret_access_key,
      },
    })
  );

  try {
    const { details } = await readBody<{ details: RegistryItem }>(event);
    details.uniqueId = uuidv5(details.submittedBy, CMDIY_NAMEPSACE);
    details.buildDate = '---';
    details.year = Number(details.year);
    await docClient.send(
      new PutCommand({
        TableName: 'MiniRegisterQueue',
        Item: { ...details },
      })
    );
    const { data: issue } = await octokit.request('POST /repos/SomethingNew71/classicminidiy/issues', {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      title: `Registry ${details.year} - ${details.model}`,
      labels: ['Mini Register'],
      assignees: ['SomethingNew71'],
      body: outdent`
        ## New Details
          | Category    | Value                          |
          |-------------|--------------------------------|
          | Name        | ${details.submittedBy}         |
          | Email       | ${details.submittedByEmail}    |
          | Year        | ${details.year}                |
          | Model       | ${details.model}               |
          | Trim        | ${details.trim}                |
          | Body Type   | ${details.bodyType}            |
          | Engine Size | ${details.engineSize}          |
          | Color       | ${details.color}               |
          | Body #      | ${details.bodyNum}             |
          | Engine #    | ${details.engineNum}           |
          | Build Date  | ${details.buildDate}           |
          | Notes       | ${details.notes}               |
          | Unique ID   | ${details.uniqueId}            |
        `,
    });

    return {
      issueNumber: issue.number,
      issueUrl: issue.html_url,
      uuid: details.uniqueId,
      details,
    };
  } catch (error: any) {
    throw new Error(`Error submitting to Queue - ${error?.message}`);
  }
});
