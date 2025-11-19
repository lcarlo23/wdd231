const infoDiv = document.getElementById('submission-info');
const params = new URLSearchParams(window.location.search);
const first = params.get('first');
const last = params.get('last');
const email = params.get('email');
const phone = params.get('phone');
const org = params.get('org');
const level = params.get('level');
const description = params.get('description');
const timestamp = params.get('timestamp');

export default function populateInfo() {
    infoDiv.innerHTML = `
First name: <span class="form-info">${first}</span><br><br>
Last name: <span class="form-info">${last}</span><br><br>
Email: <span class="form-info">${email}</span><br><br>
Phone: <span class="form-info">${phone}</span><br><br>
Organization: <span class="form-info">${org}</span><br><br>
Membership Level: <span class="form-info">${level}</span><br><br>
Description:<br><span class="form-info">${description}</span><br><br>
Submitted on:<br><span class="form-info">${timestamp}</span>
`;
}