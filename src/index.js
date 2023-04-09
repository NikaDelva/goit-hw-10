import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix, { Notify } from 'notiflix';

const searchFieldEl = document.querySelector('#search-box');
const countryResultListEl = document.querySelector('.country-list');
const resultCountryInfoEl = document.querySelector('.country-info');


function createMarkupCounties(countriesArr) {
   let markupCountriesList = countriesArr.map(({ flags, name }) =>
    `<li>
      <img src="${flags.svg}" alt="${flags.alt}" height = "50" width = "100" loading="lazy">
      <p>${name.official}</p>
      </li>`
   ).join('');
    countryResultListEl.insertAdjacentHTML('beforeend', markupCountriesList);
}

function createMarkupCountryCard(countriesArr) { 
  const { name, capital, population, languages, flags } = countriesArr; 
  const markup = ` 
    <img src="${flags.svg}" alt="${flags.alt}" height = "50" width = "100"> 
    <h2>${name.official}</h2> 
    <p>Capital: ${capital}</p> 
    <p>Population: ${population}</p> 
    <p>Languages: ${Object.values(languages)}</p> 
  `; 
    countryResultListEl.innerHTML = '';
    resultCountryInfoEl.insertAdjacentHTML('beforeend', markup); 
}


function onInputSearch(evt) {
    resultCountryInfoEl.innerHTML = '';
    countryResultListEl.innerHTML = '';
    const inputValue = evt.target.value.trim();
    if (inputValue === '') {
        return
    }
    fetchCountries(inputValue)
        .then(countriesArr => {
            if (countriesArr.length > 10) {
                Notiflix.Notify.info(`Too many matches found. Please enter a more specific name`);
                return;
            }
            console.log(countriesArr)
            if (2 <= countriesArr.length <= 10) {
                createMarkupCounties(countriesArr);
            }
            if (countriesArr.length === 1) {
             createMarkupCountryCard(countriesArr[0]);
            }
        })
        .catch((error) => {
            if (error.message === '404') {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        })
}
searchFieldEl.addEventListener('input', debounce(onInputSearch, 300));

//створити 2 функції рендеру: 1 для 1 конкретної країни та
//2 для країн із співпадаючими назвами
//викликати їх під час перевірок у фетч-зен
//на помилку викликати нотіфлікс