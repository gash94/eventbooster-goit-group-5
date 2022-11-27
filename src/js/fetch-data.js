const axios = require('axios').default;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'GxDzkfGCFz900fvLiCUzjO4VEZhSzI0Z';

async function fetchEvents(searchValue, country, page) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      method: 'get',
      params: {
        apikey: API_KEY,
        keyword: searchValue,
        size: 20,
        page: page,
        countryCode: country,
      },
    });
    return {
      events: response.data._embedded.events,
      pageInfo: response.data.page,
    };
  } catch (error) {
    console.log(error);
  }
}

export default fetchEvents;

export async function fetchInfoEvent(eventId) {
  try {
    const response = await axios.get(`${BASE_URL}/${eventId}.json`, {
      method: 'get',
      params: {
        apikey: API_KEY,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
