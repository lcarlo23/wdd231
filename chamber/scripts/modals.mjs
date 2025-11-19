const npModal = document.getElementById('np-modal');
const npClose = document.getElementById('np-close');
const bronzeModal = document.getElementById('bronze-modal');
const bronzeClose = document.getElementById('bronze-close');
const silverModal = document.getElementById('silver-modal');
const silverClose = document.getElementById('silver-close');
const goldModal = document.getElementById('gold-modal');
const goldClose = document.getElementById('gold-close');

const npBtn = document.querySelector('#np-card button');
const bronzeBtn = document.querySelector('#bronze-card button');
const silverBtn = document.querySelector('#silver-card button');
const goldBtn = document.querySelector('#gold-card button');

export default function displayModal() {
    npBtn.addEventListener('click', () => {
        npModal.showModal();
    });
    npClose.addEventListener('click', () => {
        npModal.close();
    });
    bronzeBtn.addEventListener('click', () => {
        bronzeModal.showModal();
    });
    bronzeClose.addEventListener('click', () => {
        bronzeModal.close();
    });
    silverBtn.addEventListener('click', () => {
        silverModal.showModal();
    });
    silverClose.addEventListener('click', () => {
        silverModal.close();
    });
    goldBtn.addEventListener('click', () => {
        goldModal.showModal();
    });
    goldClose.addEventListener('click', () => {
        goldModal.close();
    });
}