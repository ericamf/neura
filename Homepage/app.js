const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu-mobile');

hamburger.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelector('.search-icon').addEventListener('click', function() {
    document.querySelector('.search-box').classList.toggle('active');
});

