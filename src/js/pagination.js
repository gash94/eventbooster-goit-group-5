import Pagination from 'tui-pagination';

import renderCards from './render-cards';

const cardEvents = document.querySelector('.cards');
let pagination;

const renderPagination = pageInfo => {
  const options = {
    totalItems: pageInfo.totalElements,
    itemsPerPage: pageInfo.size,
    visiblePages: 5,
    page: pageInfo.number + 1,
    centerAlign: true,
  };

  pagination = new Pagination('pagination', options);

  pagination.on('afterMove', function (eventData) {
    // cardEvents.innerHTML = '';
    let pageNumber = eventData.page - 1;
    renderCards(pageNumber);
  });

  if (pageInfo.number === 0) {
    const prev = document.querySelector('.tui-prev');
    prev.style.display = 'none';
  } else if (pageInfo.number + 1 === pageInfo.totalPages) {
    const next = document.querySelector('.tui-next');
    next.style.display = 'none';
  }
};

export default renderPagination;
