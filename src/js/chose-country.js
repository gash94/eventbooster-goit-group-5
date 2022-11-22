import renderCards from './render-cards';

const inputSelectCountry = document.querySelector('#chose-country');
const countryBox = document.querySelector('.country');
const countries = [...document.querySelectorAll('.country__item')];
const countryList = document.querySelector('.country__list');
const inputSearch = document.querySelector('.search__input');
const polygonIcon = document.querySelector('#polygon');
const form = document.querySelector('form');

inputSelectCountry.addEventListener('click', () => {
  countryBox.classList.toggle('hide');
  polygonIcon.classList.toggle('rotate');
  inputSelectCountry.classList.toggle('header__input--open');
});

countryBox.addEventListener('click', e => {
  console.log(e.target.textContent);
  inputSelectCountry.value = e.target.textContent;
  countryBox.classList.toggle('hide');
  inputSelectCountry.classList.toggle('header__input--open');
});
inputSelectCountry.addEventListener('input', e => {
  const currentWord = e.target.value.toUpperCase();
  let result = countries;
  result = result.filter(countries =>
    countries.textContent.toUpperCase().includes(currentWord)
  );
  countryList.textContent = '';
  result.forEach(item => countryList.appendChild(item));
});

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     renderCards(inputSearch.value, inputSelectCountry.value)
//     console.log(inputSearch.value, inputSelectCountry.value)

// })
export default form;
