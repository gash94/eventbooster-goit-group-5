import fetchEvents from './fetch-data';
import markupEvents from './markup-event';
import { scrollLoad } from './scroll';

const inputSelectCountry = document.querySelector('#chose-country');
const inputSearch = document.querySelector('.search__input');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');
const notfound = document.querySelector('.notfound');
let searchValue = '';
let country = 'pl';
let numPage = '0';

const renderCards = () => {
  fetchEvents(searchValue, country, numPage)
    .then(({ events, pageInfo }) => {
      // console.log(events);
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
      notfound.innerText = '';
      markupEvents(eventDetails);
      // if (numPage !== 1) {
      //   scrollLoad(1);
      // }
    })
    .catch(err => {
      console.log(err);
      notfound.innerText =
        'Sorry, no matches were found. Try a new search or use our suggestions.';
    });
};
renderCards();

form.addEventListener('submit', e => {
  e.preventDefault();
  cards.innerHTML = '';
  searchValue = inputSearch.value.trim();
  country = inputSelectCountry.dataset.country;

  console.log('value:', searchValue);
  console.log('country:', country);
  renderCards();
  inputSearch.value = '';
});

export default renderCards;
