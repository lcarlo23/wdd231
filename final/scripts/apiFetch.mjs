const url = 'https://restcountries.com/v3.1/all?fields=name,flags,population,capital,languages,currencies,region,maps';
const countries = await apiFetch(url);

async function apiFetch(url) {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

export default countries;