import fetchEvents from './fetch-data';
import markupEvents from './markup-event';

const notfound = document.querySelector('.notfound');
let searchValue = 'rock';
let country = 'pl';
let page = '1';

const renderCards = () => {
  fetchEvents(searchValue, country, page)
    .then(({ events, pageInfo }) => {
      console.log(events);
      const eventDetails = events.map(item => ({
        name: item.name,
        urlImage: item.images[4].url,
        date: item.dates.start.localDate,
        place: item._embedded.venues[0].name,
        city: item._embedded.venues[0].city.name,
        country: item._embedded.venues[0].country.name,
        id: item.id,
        urlTicket: item.url,
      }));
      markupEvents(eventDetails);
    })
    .catch(err => {
      console.log(err);
      notfound.innerText =
        'Sorry, no matches were found. Try a new search or use our suggestions.';
      return;
    });
};
renderCards();
export default renderCards;
