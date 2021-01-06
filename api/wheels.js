import axios from 'axios';
const elastisearchUN = process.env.elastisearchUN;
const elastisearchPW = process.env.elastisearchPW;
const elastisearchAPI = process.env.elastisearch.endpoint;

export default {
  async getResults (wheelSize, searchString) {
    // TODO: Configure results size and pagniate yo
    const searchURL = `${elastisearchAPI}/_search`;
    const searchPayload = {
      query: {
        bool: {
          must: {
            term: { majorSize: wheelSize }
          },
          multi_match: {
            query: searchString,
            fields: [
              'name',
              'notes',
              'offset',
              'size',
              'type'
            ]
          }
        }
      }
    };

    const result = await axios.get(searchURL, {
      auth: {
        username: elastisearchUN,
        password: elastisearchPW
      },
      params: searchPayload
    });
    return result;
  }
};
