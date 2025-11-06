const membersSection = document.getElementById('members');
const gridButton = document.getElementById('grid-button');
const listButton = document.getElementById('list-button');
const url = 'data/members.json';

function displayMembersGrid(members) {
    for (const member of members) {
        const card = document.createElement('article');
        const logo = document.createElement('img');
        const name = document.createElement('h3');
        const address = document.createElement('p');
        const phone = document.createElement('a');
        const website = document.createElement('a');
        const membership = document.createElement('p');
        const level = document.createElement('span');

        card.classList.add('card');
        name.classList.add('member-name');
        level.classList.add('membership-level');

        logo.src = member.logo;
        logo.alt = `${member.name} Logo`;
        logo.fetchPriority = 'high';
        logo.width = '250';
        logo.height = '100';

        name.textContent = member.name;
        address.textContent = member.address;
        phone.href = `tel:${member.phone}`;
        phone.textContent = member.phone;
        website.href = member.website;
        website.textContent = member.website;
        membership.textContent = 'Membership Level: ';
        level.textContent = member.level;

        membership.appendChild(level);
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        membersSection.appendChild(card);
    }
}

function displayMembersList(members) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const member of members) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('th');
        const name = document.createElement('p');
        const addressCell = document.createElement('td');
        const address = document.createElement('p');
        const phoneCell = document.createElement('td');
        const phone = document.createElement('a');
        const websiteCell = document.createElement('td');
        const website = document.createElement('a');
        const membershipCell = document.createElement('td');
        const membership = document.createElement('p');
        const level = document.createElement('span');

        name.classList.add('member-name');
        level.classList.add('membership-level');

        name.scope = 'row';
        name.textContent = member.name;
        address.textContent = member.address;
        phone.href = `tel:${member.phone}`;
        phone.textContent = member.phone;
        website.href = member.website;
        website.textContent = member.website;
        membership.textContent = 'Membership Level: ';
        level.textContent = member.level;

        membership.appendChild(level);
        nameCell.appendChild(name);
        addressCell.appendChild(address);
        phoneCell.appendChild(phone);
        websiteCell.appendChild(website);
        membershipCell.appendChild(membership);

        row.appendChild(nameCell);
        row.appendChild(addressCell);
        row.appendChild(phoneCell);
        row.appendChild(websiteCell);
        row.appendChild(membershipCell);

        tbody.appendChild(row);
        table.appendChild(tbody);
        membersSection.appendChild(table);
    }
}

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();

    gridButton.classList.contains('active') ?
        displayMembersGrid(data.members) :
        displayMembersList(data.members);
}

getMembers();

gridButton.addEventListener('click', () => {
    if (!gridButton.classList.contains('active')) {
        gridButton.classList.add('active');
        listButton.classList.remove('active');

        membersSection.textContent = '';
        getMembers();
    }
})

listButton.addEventListener('click', () => {
    if (!listButton.classList.contains('active')) {
        listButton.classList.add('active');
        gridButton.classList.remove('active');

        membersSection.textContent = '';
        getMembers();
    }
})