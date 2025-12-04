import navToggle from "./navToggle.mjs";
import countries from "./apiFetch.mjs";
import { filterCountries, renderSavedCountries, getSavedCountries, filterSavedCountries } from "./country-manager.mjs";

const countriesGrid = document.getElementById('countries-grid');
const heroSearch = document.getElementById('hero-search');
const savedCountries = getSavedCountries();

const filteredCountries = filterSavedCountries(countries, savedCountries);

navToggle();
renderSavedCountries(countries, countriesGrid);

heroSearch.addEventListener('input', () => filterCountries(filteredCountries, countriesGrid));