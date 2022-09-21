import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

//Переменные
const countryListEl = document.querySelector('.country-list');   
const countryInfoEl = document.querySelector('.country-info'); 

//Создаем переменную инпута и вешаем на него слушателя события
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

//При поиске страны (введение букв в инпут) вызывается функция fetchCountries(), которая забирает с API массив с данными искомой страны, делает из него разметку и рендерит ее на страницу
function searchCountry(event) {
  const countryName = event.target.value.trim();
  
  return fetchCountries(countryName)
    .then((data) => {
      //  console.log(data);
      const markup = createMarkup(data);
      addMarkupOnPage(countryInfoEl, markup);
    })
    .catch((error) => {Notiflix.Notify.failure('The country you are looking for is not found');});
}

//Функция создания разметки с информацией о стране
function createMarkup(data = []) {
  return data
    .map(({ name, capital, population, flags, languages }) => {
      return `<li> 
  <h2>${name.official}</h2>
  <p>${capital}</p>
  <p>${population}</p>
  <img href='${flags.svg}' alt='Flag' weight=200px>
  <p>${Object.values(languages)}<p>
  </li>`})
    .join('');
};


//Функция, которая рендерит разметку с информацией о стране
function addMarkupOnPage(elem, markup = '') {
  elem.innerHTML = markup;
};

//console.log(countryName)

