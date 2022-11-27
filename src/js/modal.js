import { fetchInfoEvent } from './fetch-data';
import MicroModal from 'micromodal';
import renderCards from './render-cards';
const modalContentElem = document.querySelector('.modal__content');
const modalTopImage = document.querySelector('.modal__top_image');
const eventImageElem = document.querySelector('.event__image');
const infoElem = document.querySelector('.event__info');
const startDateElem = document.querySelector('.event__start_date');
const placeElem = document.querySelector('.event__place');
const whoElem = document.querySelector('.event__who');
const pricesElem = document.querySelector('.event__prices');
const cardsElem = document.querySelector('.cards');
const moreAuthorBtn = document.querySelector('.event__btn2');

MicroModal.init();

cardsElem.addEventListener('click', event => {
  event.preventDefault();

  MicroModal.show('modal-1');
  updateModalData(event.target.dataset.id);
});

export async function updateModalData(eventId) {
  const eventData = await fetchInfoEvent(eventId);

  console.log(eventData);

  let nameArtist = eventData.name;
  moreAuthorBtn.dataset.name = nameArtist;
  modalTopImage.innerHTML = '';
  eventImageElem.innerHTML = '';
  pricesElem.innerHTML = '';
  placeElem.innerHTML = '';

  modalTopImage.insertAdjacentHTML(
    'beforeend',
    `
    <img src="${eventData.images[4].url}">
  `
  );

  eventImageElem.insertAdjacentHTML(
    'beforeend',
    `
    <img src="${eventData.images[4].url}">
  `
  );

  infoElem.textContent =
    eventData.info || eventData.description || eventData.name;
  startDateElem.innerHTML = `
    ${eventData.dates.start.localDate}
    <br>
    ${eventData.dates.start.localTime} (${eventData.dates.timezone})
  `;

  whoElem.textContent = eventData.name;

  for (const venue of eventData._embedded.venues) {
    placeElem.insertAdjacentHTML(
      'beforeend',
      `
    ${venue.city.name}, ${venue.country.name}
    <br>
    ${venue.name}
    `
    );
  }

  for (const priceRange of eventData.priceRanges) {
    pricesElem.insertAdjacentHTML(
      'beforeend',
      `
      <div class="event__single_price">
      <div>
          ${priceRange.type.toUpperCase()} ${priceRange.min}-${
        priceRange.max
      } ${priceRange.currency}
        </div>
        <a class="event__btn1 event__buy_tickets" href="${
          eventData.url
        }" target="_blank">BUY TICKETS</a>
      </div>
    `
    );
  }
}
