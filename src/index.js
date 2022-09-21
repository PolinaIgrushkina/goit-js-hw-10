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

//При поиске страны (введение букв в инпут) вызывается функция fetchCountries(), которая забирает с API массив с данными искомой страны, делает из него разметку и рендерит ее на страницу в виде списка или с информацией об 1 стране
function searchCountry(event) {
  const countryName = event.target.value.trim();

  cleanMarkup(countryListEl);
  cleanMarkup(countryInfoEl);

  return fetchCountries(countryName)
    .then((data) => {
      console.log(data);

      if (data.length >= 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (data.length === 1) {
        const markupInfo = createMarkupInfo(data);
        addMarkupOnPage(countryInfoEl, markupInfo);
      } else if (data.length >= 2 && data.length <= 10) {
        const markup = createMarkupList(data);
        addMarkupOnPage(countryListEl, markup);
      }
    })
    .catch((error) => {Notiflix.Notify.failure('Oops, there is no country with that name');});
}

function createMarkupList(data = []) {
  return data
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src='${flags.svg}' alt='flag' weith='20' height='10'>
      <p>${name.official}<p>`
     })
    .join('');
}


//Функция создания разметки с информацией о стране
function createMarkupInfo(data = []) {
  return data
    .map(({ name, capital, population, flags, languages }) => {
      return `<h2>Official name: ${name.official}</h2>
  <p>Capital: ${capital}</p>
  <p>Population: ${population} people</p>
  <p>National flag:</p>
  <img src='${flags.svg}' alt='flag' weith='50' height='50'>
  <p>Languages: ${Object.values(languages)}<p>`})
    .join('');
};


//Функция, которая рендерит разметку с информацией о стране
function addMarkupOnPage(elem, markup = '') {
  elem.innerHTML = markup;
};

//Функция очищающая разметку
function cleanMarkup(element) {
  element.innerHTML = '';
};
