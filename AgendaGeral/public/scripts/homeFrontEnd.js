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

  /*BOTAO DOS UPDATES*/
  document.addEventListener('DOMContentLoaded', function () {
    const labelContainer2 = document.querySelector('.label-container2');
    const seeMoreButton = labelContainer2.querySelector('.see-more-button');

    labelContainer2.addEventListener('mouseenter', function () {
        seeMoreButton.style.display = 'block';
    });

    labelContainer2.addEventListener('mouseleave', function () {
        seeMoreButton.style.display = 'none';
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

// GETTING OS EVENTOS
function homeCards(cards) {
    const todayContainer = document.getElementById('carrouselToday');
    const tomorrowContainer = document.getElementById('carrouselTomorrow');
    
    todayContainer.innerHTML = '';
    tomorrowContainer.innerHTML = '';
    
    cards.forEach(card => {
        const cardTime = new Date(card.dateTime.time);

        let cardElement = document.createElement('div');
        cardElement.className = "card";
        cardElement.style.width = '17rem';
        cardElement.innerHTML = `
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="cardtextarrow">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.subtitle1} <br> ${cardTime.toLocaleDateString()} ${cardTime.getHours()}H${cardTime.getMinutes()}</p>
                </div>
                <div class="arrowcard text-end">
                    <img src="images/ARROW_CARDS.svg" class="btn" alt="A" width="50" height="50">
                </div>
            </div>
        `;

        if (cardTime.getDate() === 1) {  
            todayContainer.appendChild(cardElement);
        } else if (cardTime.getDate() === 2) { 
            tomorrowContainer.appendChild(cardElement);
        }

        cardElement.addEventListener('click', () => {
            modal.style.display = "flex";

            console.log(card.image)

            modalTitle.innerHTML = card.title;
            modalImage.src = card.image;
            modallocalName.innerHTML = card.localInfo.localName;
            modallocalSubname.innerHTML = card.localInfo.localSubname;
            modalemail.innerHTML = card.localInfo.email;
            modalcontact.innerHTML = card.localInfo.contact;
            modaleventInfo.innerHTML = card.eventInfo;
            modaldate1.innerHTML = card.datesInfo.date1;
            modaldate2.innerHTML = card.datesInfo.date2;
            modaltime.innerHTML = card.dateTime.time;
            modalduration.innerHTML = card.dateTime.duration;
        });
    });
}

// Fetching the cards from the server
fetch('/cards')
    .then(response => response.json())
    .then(data => {
        homeCards(data);
    })
    .catch(error => {
        console.error('Error fetching cards:', error);
    });