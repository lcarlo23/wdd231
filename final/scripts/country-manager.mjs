import apiFetch from "./apiFetch.mjs";
import { populateMyCountries } from "./saved-countries.mjs";

const main = document.querySelector('main');
const countriesGrid = document.getElementById('countries-grid');
const countrySearch = document.getElementById('country-search');
const regionFilter = document.getElementById('region-filter');
const url = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,languages,currencies,region,maps";

const cardLoadLimit = 15;
let cardLoaded = 0;

async function populatePage() {
    const countries = await apiFetch(url);
    renderCountries(countries);

    countrySearch.addEventListener('input', () => filterCountries(countries));
    regionFilter.addEventListener('input', () => filterCountries(countries));
}

function renderCountries(list) {
    const countriesList = list.slice(cardLoaded, cardLoaded + cardLoadLimit);

    if (document.getElementById('load-more')) {
        document.getElementById('load-more').remove();
    }

    for (const country of countriesList) {
        const card = document.createElement('div');
        const h2 = document.createElement('h2');
        const flag = document.createElement('img');
        const button = document.createElement('button');

        card.classList.add('country-card');
        button.classList.add('link-button');
        button.dataset.name = country.name.common;
        button.addEventListener('click', e => countryModal(e, list));

        h2.textContent = country.name.common;
        flag.src = country.flags.png;
        flag.alt = country.flags.alt;
        flag.width = 300;
        flag.height = 150;
        flag.loading = 'lazy';
        button.textContent = `Discover ${country.name.common}`;

        card.appendChild(h2);
        card.appendChild(flag);
        card.appendChild(button);
        countriesGrid.appendChild(card);
    }

    cardLoaded += cardLoadLimit;

    if (cardLoaded < list.length) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'load-more';
        loadMoreBtn.classList.add('link-button');
        loadMoreBtn.textContent = 'Load more';

        loadMoreBtn.addEventListener('click', () => {
            renderCountries(list)
        });

        countriesGrid.appendChild(loadMoreBtn);
    };
}

function filterCountries(list) {
    const regionSearch = regionFilter.value.toLowerCase();
    const nameSearch = countrySearch.value.toLowerCase();

    let filteredRegion;
    let filteredCountries;

    if (regionSearch !== "") {
        filteredRegion = list.filter(country =>
            country.region.toLowerCase() === regionSearch
        );
    } else {
        filteredRegion = list;
    }

    if (nameSearch !== "") {
        filteredCountries = filteredRegion.filter(country =>
            country.name.common.toLowerCase().includes(nameSearch)
        );
    } else {
        filteredCountries = filteredRegion;
    }

    resetGrid();

    if (filteredCountries.length === 0) {
        const p = document.createElement('p');
        p.classList.add('empty-search');
        p.textContent = 'No results found. Try adjusting your filters or search term.';

        countriesGrid.appendChild(p);

        return;
    }

    renderCountries(filteredCountries);
}

function resetGrid() {
    countriesGrid.textContent = '';
    cardLoaded = 0;
}

function countryModal(e, list) {
    const name = e.target.dataset.name;

    const country = list.find(country => country.name.common === name);

    const countryName = country.name.common;

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
    const saveBtn = document.createElement('button');
    const closeBtn = document.createElement('button');

    flag.classList.add('flag');
    infoDiv.classList.add('info-box');
    mapBtn.classList.add('link-button');
    saveBtn.classList.add('link-button');
    closeBtn.classList.add('link-button');

    flag.src = country.flags.svg;
    flag.alt = country.flags.alt;

    h2.textContent = countryName;
    population.innerHTML = `Population: <b>${country.population.toLocaleString()}</b>`;
    capital.innerHTML = `Capital: <b>${country.capital}</b>`;
    currencies.textContent = 'Currencies:';
    languages.textContent = 'Languages:';
    region.innerHTML = `Region: <b>${country.region}</b>`;
    mapBtn.textContent = 'View on Google Maps';


    saveBtn.textContent = isCountrySaved(countryName) ? 'Remove from Favorites' : 'Save to Favorites';
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

    saveBtn.addEventListener('click', e => {
        if (saveBtn.textContent == 'Save to Favorites') {
            saveCountry(countryName);
            saveBtn.textContent = 'Remove from Favorites';
        } else {
            removeCountry(countryName);
            saveBtn.textContent = 'Save to Favorites';
            if (window.location.href.includes('my-countries')) {
                modal.close();
                modal.remove();

                resetGrid();

                populateMyCountries();
            }
        }
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
    buttonsDiv.appendChild(saveBtn);
    buttonsDiv.appendChild(closeBtn);
    modal.appendChild(h2);
    modal.appendChild(flag);
    modal.appendChild(infoDiv);
    modal.appendChild(buttonsDiv);
    main.appendChild(modal);

    modal.showModal();
}

function getMyCountries() {
    return JSON.parse(localStorage.getItem('myCountries')) || [];
}

function saveCountry(name) {
    let myCountries = getMyCountries();

    if (!myCountries.includes(name)) {
        myCountries.push(name);

        localStorage.setItem('myCountries', JSON.stringify(myCountries));
    }
}

function removeCountry(name) {
    let myCountries = getMyCountries();

    if (myCountries.includes(name)) {
        const index = myCountries.indexOf(name);
        myCountries.splice(index, 1);

        localStorage.setItem('myCountries', JSON.stringify(myCountries));
    }
}

function isCountrySaved(name) {
    const myCountries = getMyCountries();
    return myCountries.includes(name);
}

export { countriesGrid, countrySearch, regionFilter, url, populatePage, renderCountries, filterCountries, getMyCountries }