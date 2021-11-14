import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
import debounce from 'lodash.debounce'
import {Notify} from 'notiflix'

const DEBOUNCE_DELAY = 300;
const listRef = document.querySelector('.country-list');
const inputRef = document.querySelector('input#search-box');
const infoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputGetCountry, DEBOUNCE_DELAY));

function onInputGetCountry(){
    listRef.innerHTML ='';
    infoRef.innerHTML = '';
    const value = inputRef.value.trim();
    if (!value) {
        return
    }
    fetchCountries(value)
    .then(response => {
        if(!response.ok) {
            throw Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
    }
    ).then(countries =>{
        if(countries.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
            return
        }
        if (countries.length === 1){
           return makeCountryMarkup(countries)
        }
        else{ 
        return makeCountriesMarkup(countries)}
        }).catch(console.log)
 }

function makeCountriesMarkup (countries) {
    
    listRef.innerHTML = countries.map(({name, flags}) =>`<li class="country-list__item">
    <img src="${flags.svg}" alt="${name.common} width="30" height="20">
    <span class="country-list__name">${name.common}<span>
    </li>`).join('');   
}
function makeCountryMarkup (country) {
    
    const {flags, name,  capital,  languages, population} = country[0]
    const lang = Object.values(languages).join(', ')
      return infoRef.innerHTML = `<h1><img class="country-info__img" src="${flags.svg}" alt="${name.common} width="30" height="30"">${name.common}<h1>
        <ul class="country-info__list">
        <li class="country-info__item">Capital:<span class="country-info__value">${capital}</span></li>
        <li class="country-info__item">Population:<span class="country-info__value">${population}</span></li>
        <li class="country-info__item">Languages:<span class="country-info__value">${lang}</span></li>
        </ul>`
    }

