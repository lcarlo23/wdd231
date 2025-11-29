const navButton = document.querySelector('#ham-button');
const navBar = document.querySelector('#nav-bar');

export default function navToggle() {
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}