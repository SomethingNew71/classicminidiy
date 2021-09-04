import { request } from '@octokit/request';
import fixIndent from 'outdent';
import axios from 'axios';

const express = require('express');
const app = express();

app.use(express.json());

// API call for creating a github issue for wheels update
app.post('/github/issues', (req, res) => {
  request('POST /repos/SomethingNew71/classicminidiy/issues', {
    headers: {
      authorization: process.env.githubKey,
      accept: 'application/vnd.github.v3+json'
    },
    title: `Update ${req.body.wheel.name} - ${req.body.wheel.size}`,
    labels: ['Wheel Update'],
    assignees: ['SomethingNew71'],
    body: fixIndent`
    ## Old Details

      | Category | Value                   |
      |----------|-------------------------|
      | Name     | ${req.body.wheel.name}      |
      | Offset   | ${req.body.wheel.offset}    |
      | Size     | ${req.body.wheel.majorSize} |
      | Width    | ${req.body.wheel.size}      |
      | Material | ${req.body.wheel.type}      |
      | Notes    | ${req.body.wheel.notes}     |

    ## New Details

      | Category | Value                        |
      |----------|------------------------------|
      | Name     | ${req.body.newDetails.name}      |
      | Offset   | ${req.body.newDetails.offset}    |
      | Size     | ${req.body.newDetails.majorSize} |
      | Width    | ${req.body.newDetails.size}      |
      | Material | ${req.body.newDetails.type}      |
      | Notes    | ${req.body.newDetails.notes}     |
    `
  }).then((response) => {
    res.status(response.status).json(response.data);
  }).catch((error) => {
    res.status(error.status).error(error);
  });
});

// API Call for getting all youtube information
app.get('/youtube', (req, res) => {
  const apiKey = process.env.YoutubeKey;
  const baseURL = 'https://www.googleapis.com/youtube/v3/channels';
  const id = process.env.YoutubeID;
  const details = 'snippet,contentDetails,statistics';
  const feed = `${baseURL}?key=${apiKey}&id=${id}&part=${details}`;

  axios.get(feed).then((response) => {
    res.status(response.status).json(response.data);
  }).catch((error) => {
    res.status(error.status).error(error);
  });
});

module.exports = app;
