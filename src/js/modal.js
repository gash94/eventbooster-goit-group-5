import { fetchEvent } from './fetch-data';
import MicroModal from 'micromodal';
const modalContentElem = document.querySelector('.modal__content');
const modalTopImage = document.querySelector('.modal__top_image');
const eventImageElem = document.querySelector('.event__image');
const infoElem = document.querySelector('.event__info');
const startDateElem = document.querySelector('.event__start_date');
const placeElem = document.querySelector('.event__place');
const whoElem = document.querySelector('.event__who');
const pricesElem = document.querySelector('.event__prices');
const cardsElem = document.querySelector('.cards');

const apikey = "mkwIMojX5HHlKyGujroFjmMIYR083OUT";

MicroModal.init();

cardsElem.addEventListener("click", event => {
  event.preventDefault();

  MicroModal.show('modal-1');

  updateModalData(event.target.dataset.id);
});


async function updateModalData(eventId) {
  // const eventId = event.target.dataset.id;

  // const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apikey}`);
  const eventData = await fetchEvent(eventId);
  

  console.log(eventData);

  modalTopImage.innerHTML = '';
  eventImageElem.innerHTML = '';
  pricesElem.innerHTML = '';
  placeElem.innerHTML = '';

  modalTopImage.insertAdjacentHTML("beforeend", `
    <img src="${eventData.images[4].url}">
  `);

  eventImageElem.insertAdjacentHTML("beforeend", `
    <img src="${eventData.images[4].url}">
  `)


  infoElem.textContent = eventData.info || eventData.description || eventData.name;
  startDateElem.innerHTML = `
    ${eventData.dates.start.localDate}
    <br>
    ${eventData.dates.start.localTime} (${eventData.dates.timezone})
  `;

  whoElem.textContent = eventData.name;

  for(const venue of eventData._embedded.venues) {
    placeElem.insertAdjacentHTML("beforeend", `
    ${venue.city.name}, ${venue.country.name}
    <br>
    ${venue.name}
    `)
  }

  for(const priceRange of eventData.priceRanges) {
    pricesElem.insertAdjacentHTML("beforeend", `
      <div class="event__single_price">
        <div>
          ${priceRange.type} ${priceRange.min}-${priceRange.max} ${priceRange.currency}
        </div>
        <a class="event__btn1 event__buy_tickets" href="${eventData.url}" target="_blank">BUY TICKETS</a>
      </div>
    `)
  }

}


