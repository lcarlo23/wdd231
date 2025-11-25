const poisSection = document.getElementById('pois');
const url = 'data/pois.json';

function createCards(pois) {
    for (const poi of pois) {
        const card = document.createElement('article');
        const name = document.createElement('h2');
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const address = document.createElement('address');
        const description = document.createElement('p');
        const button = document.createElement('button');

        card.classList.add('card');
        image.classList.add('discover-image');
        button.classList.add('link-button')

        image.src = poi.image;
        image.alt = `${poi.name} image`;
        image.fetchPriority = 'high';
        image.width = '300';
        image.height = '200';

        name.textContent = poi.name;
        address.textContent = poi.address;
        description.textContent = poi.description;
        button.textContent = 'learn more';

        figure.appendChild(image);
        card.appendChild(name);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        poisSection.appendChild(card);
    }
}

export default async function populateCards() {
    const response = await fetch(url);
    const data = await response.json();

    createCards(data.pois);
}