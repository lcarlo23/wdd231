const year = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');

const today = new Date();

year.textContent = today.getFullYear();
lastModified.textContent = document.lastModified;