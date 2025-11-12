const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const high = document.getElementById('high');
const low = document.getElementById('low');
const humidity = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const today = document.getElementById('today');
const tomorrow = document.getElementById('tomorrow');
const aftertomorrow = document.getElementById('aftertomorrow');

const lat = 45.69425408561644;
const lon = 9.676530465843678;
const key = '7323c89b3d88e75839b163beadf37ceb';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

export default async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const forecastResponse = await fetch(urlForecast);

        if (!forecastResponse.ok) {
            throw Error(await forecastResponse.text());
        }

        const forecastData = await forecastResponse.json();
        displayForecastResults(forecastData);

    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = `${data.weather[0].description} icon`;
    temp.textContent = `${data.main.temp}° C`;
    description.textContent = data.weather[0].description;
    high.textContent = `High: ${data.main.temp_max}° C`;
    low.textContent = `Low: ${data.main.temp_min}° C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const sunriseTime = new Date(data.sys.sunrise * 1000).toUTCString().slice(-11, -7);
    const sunsetTime = new Date(data.sys.sunset * 1000).toUTCString().slice(-11, -7);

    sunrise.textContent = `Sunrise: ${sunriseTime}am`;
    sunset.textContent = `Sunset: ${sunsetTime}pm`;
}

function displayForecastResults(data) {
    const tomorrowDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(data.list[8].dt * 1000));
    const aftertomorrowDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(data.list[16].dt * 1000));

    today.textContent = `Today: ${data.list[0].main.temp}° C`;
    tomorrow.textContent = `${tomorrowDay}: ${data.list[8].main.temp}° C`;
    aftertomorrow.textContent = `${aftertomorrowDay}: ${data.list[16].main.temp}° C`;
}