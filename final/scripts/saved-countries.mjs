import { countriesGrid, countrySearch, regionFilter, getCountries, getMyCountries, renderCountries, filterCountries } from "./country-manager.mjs";

async function populateMyCountries() {
    countrySearch.value = '';
    regionFilter.value = '';
    const countries = await getCountries();
    const myCountries = getMyCountries();

    const savedCountries = getSavedCountries(countries, myCountries);

    if (!savedCountries) return;

    renderCountries(savedCountries);

    countrySearch.addEventListener('input', () => filterCountries(savedCountries));
    regionFilter.addEventListener('input', () => filterCountries(savedCountries));
}

function getSavedCountries(originalList, savedList) {
    const filteredList = originalList.filter(country => savedList.includes(country.name.common));

    if (filteredList.length === 0) {
        const p = document.createElement('p');
        p.classList.add('empty-search');
        p.innerHTML = 'No results found.<br>Try adjusting your filters or search term and make sure to save at least one country.<br><br><strong><a href="./discover.html">GO TO DISCOVER PAGE</a></strong>';

        countriesGrid.appendChild(p);

        return;
    }

    return filteredList;
}

export { populateMyCountries }