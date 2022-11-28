import fetchEvents from './fetch-data';
import markupEvents from './markup-event';
import renderPagination from './pagination';
import { scrollPage } from './scroll';
import { chooseBestImage } from './fetch-data';
import MicroModal from 'micromodal';

const inputSelectCountry = document.querySelector('#chose-country');
const inputSearch = document.querySelector('.search__input');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');
const notfound = document.querySelector('.notfound');
const spinner = document.querySelector('.spinner');
const moreAuthorBtn = document.querySelector('.event__btn2');

let searchValue = '';
let country = 'pl';

const renderCards = (pageNumber = 0) => {
  spinner.classList.toggle('spinner-show');
  fetchEvents(searchValue, country, pageNumber)
    .then(({ events, pageInfo }) => {
      const eventDetails = events.map(item => ({
        name: item.name,
        urlImage: chooseBestImage(item),
        date: item.dates.start.localDate,
        place:
          item._embedded.venues[0].name ||
          item._embedded.venues[0].address.line1, // property not availabe sometimes
        city: item._embedded.venues[0].city.name,
        country: item._embedded.venues[0].country.name,
        id: item.id,
        urlTicket: item.url,
      }));
      console.log(events);
      notfound.innerText = '';
      cards.innerHTML = '';
      markupEvents(eventDetails);
      renderPagination(pageInfo);
      if (pageNumber !== 0) {
        setTimeout(() => {
          scrollPage();
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
      }, 1300);
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
moreAuthorBtn.addEventListener('click', e => {
  e.preventDefault();
  cards.innerHTML = '';
  console.log(e.target.dataset.name);
  searchValue = e.target.dataset.name;
  country = '';
  renderCards();
  MicroModal.close('modal-1');
});
export default renderCards;
