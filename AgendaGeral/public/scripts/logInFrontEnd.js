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

//  MODAIS COM OS FORMULÁRIOS

document.addEventListener('DOMContentLoaded', function () {
  const btn1 = document.querySelectorAll('.btn1');
  const btn2 = document.querySelectorAll('.btn2');
  const modal1 = document.getElementById('myModal');
  const modal2 = document.getElementById('myModal2');
  const closeButtons = document.querySelectorAll('.buttonX');

  // Função para abrir o Modal 1 e fechar o Modal 2
  btn1.forEach(button => {
      button.addEventListener('click', function () {
          modal1.style.display = 'grid';
          modal2.style.display = 'none';
      });
  });

  // Função para abrir o Modal 2 e fechar o Modal 1
  btn2.forEach(button => {
      button.addEventListener('click', function () {
          modal2.style.display = 'grid';
          modal1.style.display = 'none';
      });
  });

  // Função para fechar ambos os modais ao clicar no botão de fechar
  closeButtons.forEach(button => {
      button.addEventListener('click', function () {
          modal1.style.display = 'none';
          modal2.style.display = 'none';
      });
  });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  window.location.href = 'userBusiness.html';
});

/*  ENVIAR DADOS DOS FORMULÁRIOS PARA O BACKEND + BASE DE DADOS */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('articleForm');
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const formData = {
        firstName: document.getElementById('validationDefault01').value,
        lastName: document.getElementById('validationDefault02').value,
        username: document.getElementById('validationDefaultUsername').value,
        country: document.getElementById('validationDefault03').value,
        city: document.getElementById('validationDefault04').value
      };
  
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log('Dados enviados com sucesso');
        } else {
          console.error('Erro ao enviar dados');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    });
  });