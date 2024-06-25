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


//ENVIAR UM EVENTO CRIADO ATRAVÉS DO FORMULARIO
// + POP UP DE EVENTO ADICIONADO

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('eventForm');
    const popup = document.getElementById('popup');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('category', document.getElementById('category').value);
        formData.append('title', document.getElementById('title').value);
        formData.append('subtitle1', document.getElementById('subtitle1').value);
        formData.append('subtitle2', document.getElementById('subtitle2').value);
        formData.append('dateTime', JSON.stringify({
            time: document.getElementById('dateTime').value,
            duration: document.getElementById('duration').value
        }));
        formData.append('localInfo', JSON.stringify({
            localName: document.getElementById('localName').value,
            localSubname: document.getElementById('localSubname').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value
        }));
        formData.append('eventInfo', document.getElementById('description').value);
        formData.append('datesInfo', JSON.stringify({
            date1: document.getElementById('date1').value,
            date2: document.getElementById('date2').value
        }));
        formData.append('image', document.getElementById('image').files[0]);

        try {
            const response = await fetch('http://localhost:3000/events', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Event added successfully');
                form.reset(); // Limpar o formulário
                showPopup(); // Mostrar o pop-up
            } else {
                console.error('Error adding event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function showPopup() {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000); // O pop-up será exibido por 3 segundos
    }
});