import fetchEvents from './fetch-data';
import markupEvents from './markup-event';
import renderPagination from './pagination';
import { onToTopBtn } from './scroll';

const inputSelectCountry = document.querySelector('#chose-country');
const inputSearch = document.querySelector('.search__input');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');
const notfound = document.querySelector('.notfound');
const spinner = document.querySelector('.spinner');

let searchValue = '';
let country = 'pl';

const renderCards = (pageNumber = 0) => {
  spinner.classList.toggle('spinner-show');
  fetchEvents(searchValue, country, pageNumber)
    .then(({ events, pageInfo }) => {
      const eventDetails = events.map(item => ({
        name: item.name,
        urlImage: item.images[4].url,
        date: item.dates.start.localDate,
        place: item._embedded ? item._embedded.venues[0].name : '', // property not availabe sometimes
        city: item._embedded ? item._embedded.venues[0].city.name : '', // property not availabe sometimes
        country: item._embedded ? item._embedded.venues[0].country.name : '', // property not availabe sometimes
        id: item.id,
        urlTicket: item.url,
      }));
      notfound.innerText = '';
      cards.innerHTML = '';
      markupEvents(eventDetails);
      renderPagination(pageInfo);
      if (pageNumber !== 0) {
        setTimeout(() => {
          onToTopBtn();
        }, 500);
      }
    })
    .catch(err => {
      console.log(err);
      notfound.innerText =
        'Sorry, no matches were found. Try a new search or use our suggestions.';
    })
    .finally(() => {
      setTimeout(() => {
        spinner.classList.toggle('spinner-show');
      }, 1500);
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
