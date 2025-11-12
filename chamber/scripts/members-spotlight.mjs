const spotlightSection = document.getElementById('company-spotlights');
const url = 'data/members.json';

function displayMembersSpotlight(members) {
    const membersShuffled = members.sort(() => Math.random() - 0.5);

    let counter = 0;

    for (let i = 0; i < membersShuffled.length && counter < 3; i++) {
        const member = membersShuffled[i];

        if (member.level > 1) {
            const card = document.createElement('article');
            const name = document.createElement('p');
            const content = document.createElement('div');
            const info = document.createElement('div');
            const logo = document.createElement('img');
            const address = document.createElement('p');
            const phone = document.createElement('a');
            const website = document.createElement('a');
            const membership = document.createElement('p');
            const level = document.createElement('span');

            card.classList.add('spotlight-card');
            name.classList.add('member-name');
            level.classList.add('membership-level');
            content.classList.add('spotlight-content');
            info.classList.add('spotlight-info');

            logo.src = member.logo;
            logo.alt = `${member.name} Logo`;
            logo.fetchPriority = 'high';
            logo.width = '60';
            logo.height = '50';

            name.textContent = member.name;
            address.textContent = member.address;
            phone.href = `tel:${member.phone}`;
            phone.textContent = member.phone;
            website.href = member.website;
            website.textContent = member.website;
            membership.textContent = 'Membership Level: ';
            level.textContent = member.level;

            membership.appendChild(level);
            info.appendChild(address);
            info.appendChild(phone);
            info.appendChild(website);
            info.appendChild(membership);
            content.appendChild(logo);
            content.appendChild(info);
            card.appendChild(name);
            card.appendChild(content);

            spotlightSection.appendChild(card);

            counter++;
        }
    }
}

export default async function getSpotlightMembers() {
    const response = await fetch(url);
    const data = await response.json();

    displayMembersSpotlight(data.members);
}