const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const info = document.createElement('div');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const portrait = document.createElement('img');

        const fullNameString = `${prophet.name} ${prophet.lastname}`

        fullName.textContent = fullNameString;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${fullNameString}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        info.classList.add('card-info');

        info.appendChild(birthDate);
        info.appendChild(birthPlace);

        card.appendChild(fullName);
        card.appendChild(info);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data);
    displayProphets(data.prophets);
}

getProphetData();