const axios = require('axios').default;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'GxDzkfGCFz900fvLiCUzjO4VEZhSzI0Z';

async function fetchEvents(keyword = '', country = '', page = 1) {
  // TODO: Clean unused params from url
  const queryParms = new URLSearchParams({
    apikey: API_KEY,
    keyword,
    country,
    page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${queryParms}`);
    console.log('response', response.data);
    return {
      events: response.data._embedded.events,
      pageInfo: response.data.page,
    };
  } catch (error) {
    console.log(error);
  }
}

export default fetchEvents;
