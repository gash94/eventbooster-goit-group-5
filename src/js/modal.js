import MicroModal from 'micromodal';
MicroModal.init();

const cardsElem = document.querySelector('.cards');

cardsElem.addEventListener("click", event => {
  event.preventDefault();
  MicroModal.show('modal-1');
});