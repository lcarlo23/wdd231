const lastVisit = localStorage.getItem('lastVisit');
const welcome = document.getElementById('welcome');
const now = new Date();

function setLastVisit() {
    localStorage.setItem('lastVisit', now);
}

function normalizeDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default function displayWelcomeMessage() {
    if (!lastVisit) {
        welcome.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = normalizeDate(new Date(lastVisit)).getTime();
        const nowTime = normalizeDate(now).getTime();

        if (lastVisitTime === nowTime) {
            welcome.textContent = 'Back so soon! Awesome!';
        } else {
            const oneDay = 86400000;
            const days = Math.floor((nowTime - lastVisitTime) / oneDay);
            welcome.textContent = `You last visited ${days} ${days == 1 ? "day" : "days"} ago.`;
        }
    }

    setLastVisit();
}