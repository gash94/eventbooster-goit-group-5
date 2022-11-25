const cardEvents = document.querySelector('.cards');

function markupEvents(eventItems) {
  const newCard = eventItems
    .map(card => {
      let nameEvent = card.name;
      if (card.name.length > 20) {
        nameEvent = card.name.slice(0, 20) + '...';
      }

      return `<li class="cards__item  animate__animated animate__flipInX" data-id="${card.id}">
        <img class="cards__image" src="${card.urlImage}" alt="${card.name}" loading="lazy" />
        <h2 class="cards__title">${nameEvent}</h2>
        <p class="cards__date">${card.date}</p>
        <p class="cards__place"><span class="cards__pin">${card.place}</span></p>
    </li>`;
    })
    .join('');

  cardEvents.insertAdjacentHTML('beforeend', newCard);
}

export default markupEvents;
