const form = document.querySelector('form');
const timestamp = document.getElementById('timestamp');

export default function sendTime() {
    form.addEventListener('submit', () => {
        timestamp.value = document.lastModified;
    })
}