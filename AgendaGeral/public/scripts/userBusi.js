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


//MODAL
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const modalTitle = document.getElementById('modal-title');
const modallocalName = document.getElementById('modal-localName');
const modallocalSubname = document.getElementById('modal-localSubname');
const modalemail = document.getElementById('modal-email');
const modalcontact = document.getElementById('modal-contact');
const modaleventInfo = document.getElementById('modal-eventInfo');
const modalImage = document.getElementById('modal-image');
const modaldate1 = document.getElementById('modal-date1');
const modaldate2 = document.getElementById('modal-date2');
const modaltime = document.getElementById('modal-time');
const modalduration = document.getElementById('modal-duration');

//+ POP UP DELETE
const confirmDeletePopup = document.getElementById('confirmDeletePopup');
const closePopup = document.getElementById('closePopup');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

let currentEventId = null;
let currentCardElement = null;

function showPopup(eventId, cardElement) {
    currentEventId = eventId;
    currentCardElement = cardElement;
    confirmDeletePopup.style.display = "block";
}

function hidePopup() {
    confirmDeletePopup.style.display = "none";
}

closePopup.onclick = function() {
    hidePopup();
}

cancelDeleteButton.onclick = function() {
    hidePopup();
}

window.onclick = function(event) {
    if (event.target == confirmDeletePopup) {
        hidePopup();
    }
}

confirmDeleteButton.onclick = function() {
    if (currentEventId && currentCardElement) {
        deleteEvent(currentEventId, currentCardElement);
        hidePopup();
    }
}



function agendaEvents(events) {
    const myContainer = document.getElementById('conjunto');
    myContainer.innerHTML = ''; 

    events.forEach((event) => {
        const eventTime = new Date(event.dateTime.time);

        const cardElement = document.createElement('div');
        cardElement.className = "card";
        cardElement.innerHTML = `
        <div class="card mr-5" style="width: 18rem;" id="btn">
            <img src="${event.image}" class="card-img-top" alt="...">
            <div class="cardtextarrow">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.subtitle1} <br> ${eventTime.getDate()}/${eventTime.getMonth() + 1} | ${eventTime.getHours()}H${eventTime.getMinutes()}</p>
                </div>
                <div class="arrowcard">
                    <div>
                        <img src="images/user (5).svg" class="btn" alt="A" height="45">
                        <img src="images/user (1).svg" class="btn" alt="A" height="45">
                    </div>
                    <div>
                        <button class="delete" data-id="${event._id}">
                            <img src="images/user (2).svg" class="btn3" alt="A" width="30" height="30">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        myContainer.appendChild(cardElement);

        //EVENT LISTENER PARA ABRIR MODAL NO CARD
        cardElement.addEventListener('click', () => {
                modal.style.display = "flex";


                modalTitle.innerHTML = event.title;
                modalImage.src = event.image;
                modallocalName.innerHTML = event.localInfo.localName;
                modallocalSubname.innerHTML = event.localInfo.localSubname;
                modalemail.innerHTML = event.localInfo.email;
                modalcontact.innerHTML = event.localInfo.contact;
                modaleventInfo.innerHTML = event.eventInfo;
                modaldate1.innerHTML = event.datesInfo.date1;
                modaldate2.innerHTML = event.datesInfo.date2;
                modaltime.innerHTML = event.dateTime.time;
                modalduration.innerHTML = event.dateTime.duration;
            });

        //EVENT LISTENER PARA ABRIL POP-UP NO BOTAO DELETE
        const deleteButton = cardElement.querySelector('.delete');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const eventId = e.target.closest('button').dataset.id;
            showPopup(eventId, cardElement);
        });
    });
}

function deleteEvent(eventId, cardElement) {
    fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            cardElement.remove(); // Remover o elemento do DOM
        } else {
            console.error('Failed to delete event');
        }
    })
    .catch(error => console.error('Error:', error));
}

function getData() {
    const subtitle1 = 'HardClub';
    fetch(`http://localhost:3000/events?subtitle1=${subtitle1}`).then(function(response) {
        return response.json();
    })
    .then(function(events) {
        agendaEvents(events);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}

getData();