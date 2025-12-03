import apiFetch from "./apiFetch.mjs";

const countrySection = document.getElementById('random-country');
const url = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,currencies";

export default async function displayRandomCountry() {
    const h2 = document.createElement('h2');
    const flag = document.createElement('img');
    const infoDiv = document.createElement('ul');
    const population = document.createElement('li');
    const capital = document.createElement('li');
    const currencies = document.createElement('li');
    const currenciesList = document.createElement('ul');

    const data = await apiFetch(url);
    const randomIndex = Math.floor(Math.random() * data.length);
    const country = data[randomIndex];

    h2.textContent = country.name.common;
    flag.src = country.flags.svg;
    flag.alt = country.flags.alt;
    flag.width = 100;
    flag.height = 100;
    flag.classList.add('flag');

    population.innerHTML = `Population: <b>${country.population.toLocaleString()}</b>`;
    capital.innerHTML = `Capital: <b>${country.capital}</b>`;
    currencies.textContent = 'Currencies:';

    for (const currency in country.currencies) {
        const name = country.currencies[currency].name;
        const symbol = country.currencies[currency].symbol;

        const li = document.createElement('li');

        li.innerHTML = `<b>${name} (${symbol})</b>`;

        currenciesList.appendChild(li);
    }

    infoDiv.appendChild(population);
    infoDiv.appendChild(capital);
    currencies.appendChild(currenciesList);
    infoDiv.appendChild(currencies);
    countrySection.appendChild(h2);
    countrySection.appendChild(flag);
    countrySection.appendChild(infoDiv);
}