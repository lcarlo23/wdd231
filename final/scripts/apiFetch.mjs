export default async function apiFetch(url) {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}