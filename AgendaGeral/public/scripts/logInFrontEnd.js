document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
  
    hamburgerMenu.addEventListener('click', function() {
      sidebar.classList.toggle('show');
      mainContent.classList.toggle('shifted');
    });
  });