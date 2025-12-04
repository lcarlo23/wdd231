export default function displaySummary() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
    const type = params.get('type');
    const description = params.get('description');

    const container = document.getElementById('response-container');

    const p = document.createElement('p');
    p.innerHTML = `Thank you, ${name}!<br>We have successfully logged your ${type} report.`;

    const p2 = document.createElement('p');
    p2.classList.add('summary');
    p2.innerHTML = `Here is a summary of your submission:<br>
    Name: <b>${name}</b><br>
    Email: <b>${email}</b><br>
    Type: <b>${type}</b><br>
    Description:<br>
    <b>${description}</b>`;

    const homeBtn = document.createElement('a');
    homeBtn.classList.add('link-button');
    homeBtn.href = 'index.html';
    homeBtn.textContent = 'Go to Homepage';



    container.appendChild(p);
    container.appendChild(p2);
    container.appendChild(homeBtn);
}