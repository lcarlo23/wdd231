import apiFetch from "./apiFetch.mjs";

const main = document.querySelector('main');
const countriesGrid = document.getElementById('countries-grid');
const region = document.getElementById('region-filter');
const countrySearch = document.getElementById('country-search');
const loadMore = document.getElementById('load-more');
const url = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,languages,currencies,region,maps";

let countries = [];

const cardLoadLimit = 6;
let cardLoaded = 0;
let oldSearch = '';
let oldRegion = '';

export default async function populatePage() {
    countries = await apiFetch(url);

    renderCountries(countries);
    countrySearch.addEventListener('input', filterCountries);
    region.addEventListener('input', filterCountries);
    loadMore.addEventListener('click', filterCountries);
}

function renderCountries(countryList) {
    const slicedList = countryList.slice(cardLoaded, cardLoaded + cardLoadLimit);

    for (const country of slicedList) {
        const card = document.createElement('div');
        const h2 = document.createElement('h2');
        const flag = document.createElement('img');
        const button = document.createElement('button');

        card.classList.add('country-card');
        button.classList.add('link-button');
        button.dataset.name = country.name.common;
        button.addEventListener('click', countryModal);

        h2.textContent = country.name.common;
        flag.src = country.flags.svg;
        flag.alt = country.flags.alt;
        flag.width = 300;
        flag.height = 150;
        button.textContent = `Discover ${country.name.common}`;

        card.appendChild(h2);
        card.appendChild(flag);
        card.appendChild(button);
        countriesGrid.appendChild(card);
    }

    cardLoaded += cardLoadLimit;

    if (cardLoaded >= countryList.length) {
        loadMore.classList.add('hidden');
    }
}

function filterCountries(e) {
    const searchTerm = countrySearch.value.toLowerCase();

    if (searchTerm != oldSearch || region.value != oldRegion) {
        countriesGrid.textContent = '';
        cardLoaded = 0;
        loadMore.classList.remove('hidden');
    }

    const filteredList = countries.filter(country => {
        const name = country.name.common.toLowerCase();
        if (region.value === country.region || region.value === '') {
            return name.includes(searchTerm);
        }
    });

    renderCountries(filteredList);

    oldSearch = searchTerm;
    oldRegion = region.value;
}

function countryModal(e) {
    const name = e.target.dataset.name;

    const country = countries.find(country => country.name.common === name);

    const modal = document.createElement('dialog');
    const h2 = document.createElement('h2');
    const flag = document.createElement('img');
    const infoDiv = document.createElement('ul');
    const population = document.createElement('li');
    const capital = document.createElement('li');
    const languages = document.createElement('li');
    const languagesList = document.createElement('ul');
    const currencies = document.createElement('li');
    const currenciesList = document.createElement('ul');
    const region = document.createElement('li');
    const buttonsDiv = document.createElement('div');
    const mapBtn = document.createElement('button');
    const closeBtn = document.createElement('button');

    flag.classList.add('flag');
    infoDiv.classList.add('info-box');
    mapBtn.classList.add('link-button');
    closeBtn.classList.add('link-button');

    flag.src = country.flags.svg;
    flag.alt = country.flags.alt;

    h2.textContent = country.name.common;
    population.innerHTML = `Population: <b>${country.population.toLocaleString()}</b>`;
    capital.innerHTML = `Capital: <b>${country.capital}</b>`;
    currencies.textContent = 'Currencies:';
    languages.textContent = 'Languages:';
    region.innerHTML = `Region: <b>${country.region}</b>`;
    mapBtn.textContent = 'View on Google Maps';
    closeBtn.textContent = 'Close';

    currenciesList.appendChild(currencies);
    languagesList.appendChild(languages);

    for (const value of Object.values(country.languages)) {

        const li = document.createElement('li');

        li.innerHTML = `<b>${value}</b>`;

        languagesList.appendChild(li);
    }

    for (const currency in country.currencies) {
        const name = country.currencies[currency].name;
        const symbol = country.currencies[currency].symbol;

        const li = document.createElement('li');

        li.innerHTML = `<b>${name} (${symbol})</b>`;

        currenciesList.appendChild(li);
    }

    mapBtn.addEventListener('click', e => {
        window.open(country.maps.googleMaps, '_blank');
    })

    closeBtn.addEventListener('click', e => {
        modal.close();
        modal.remove();
    })

    infoDiv.appendChild(population);
    infoDiv.appendChild(capital);
    infoDiv.appendChild(languages);
    infoDiv.appendChild(languagesList);
    infoDiv.appendChild(currencies);
    infoDiv.appendChild(currenciesList);
    buttonsDiv.appendChild(mapBtn);
    buttonsDiv.appendChild(closeBtn);
    modal.appendChild(h2);
    modal.appendChild(flag);
    modal.appendChild(infoDiv);
    modal.appendChild(buttonsDiv);
    main.appendChild(modal);

    modal.showModal();
}