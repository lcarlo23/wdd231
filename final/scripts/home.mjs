import navToggle from "./navToggle.mjs";
import countries from "./apiFetch.mjs";
import { renderRandomCountry } from "./country-manager.mjs";

const countrySection = document.getElementById('random-country');

navToggle();
renderRandomCountry(countries, countrySection);