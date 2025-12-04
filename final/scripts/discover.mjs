import navToggle from "./navToggle.mjs";
import countries from "./apiFetch.mjs";
import { renderCountries, filterCountries } from "./country-manager.mjs";

const countriesGrid = document.getElementById('countries-grid');
const heroSearch = document.getElementById('hero-search');

navToggle();
renderCountries(countries, countriesGrid);

heroSearch.addEventListener('input', () => filterCountries(countries, countriesGrid));