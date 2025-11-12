const year = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');

export default function getDates() {
    const date = new Date();

    year.textContent = date.getFullYear();
    lastModified.textContent = document.lastModified;
}