/* ABERTURA MENU HABURGUER MOBILE */
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    hamburgerMenu.addEventListener('click', function () {
        hamburgerMenu.classList.toggle('active');
        sidebar.classList.toggle('show');
        mainContent.classList.toggle('hidden');
        mainContent.classList.toggle('show');
    });
});


/*ABRIR LUPA*/
document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', function () {
        searchInput.classList.toggle('show');
        searchInput.focus();
    });

    searchInput.addEventListener('blur', function () {
        if (searchInput.value === '') {
            searchInput.classList.remove('show');
        }
    });
});

/*ABRIR LUPAMOBILE*/
document.addEventListener('DOMContentLoaded', function () {
    const searchIconM = document.getElementById('search-iconM');
    const searchInputM = document.getElementById('search-inputM');
  
    searchIconM.addEventListener('click', function () {
        searchInputM.classList.toggle('show');
        searchInputM.focus();
    });
  
    searchInputM.addEventListener('blur', function () {
        if (searchInputM.value === '') {
            searchInputM.classList.remove('show');
        }
    });
  });