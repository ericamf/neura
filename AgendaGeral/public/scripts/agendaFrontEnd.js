const TODAY = new Date('April 01, 2024')

/* ABERTURA MENU HABURGUER MOBILE */
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  const bodyOverflow = document.getElementById('body')

  hamburgerMenu.addEventListener('click', function () {
      hamburgerMenu.classList.toggle('active');
      sidebar.classList.toggle('show');
      mainContent.classList.toggle('hidden');
      mainContent.classList.toggle('show');
      bodyOverflow.classList.toggle('show')
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

//ABRIR BOTÃO MOREFILTERS //
function showDivs() {
  var divs = document.getElementById('additionalDivs');
  divs.classList.toggle('show');
}





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

const DaysCarrouselContainer = document.getElementById('DaysCarrouselC');
const MonthsContainer = document.getElementById("monthsContainer")


//GETTING OS EVENTOS//
function agendaEvents(events) {
    const morningContainer = document.getElementById('carrousel-morning');
    const afternoonContainer = document.getElementById('carrousel-afternoon');
    const nightContainer = document.getElementById('carrousel-night');

    morningContainer.innerHTML = '';
    afternoonContainer.innerHTML = '';
    nightContainer.innerHTML = '';
    
    for(let i=0; i < events.length; i++) {
      const eventTime = new Date(events[i].dateTime.time);

      let cardElement = document.createElement('div');
      cardElement.className = "containerEvent";
      cardElement.innerHTML += `
          <div class="image-container">
              <img src="${events[i].image}">
              <h1>${events[i].category}</h1>
          </div>
          <div class="label-container">
            <div class="header">
              <div class="content-zone">
                <p class="time">${eventTime.getHours()}H${eventTime.getMinutes()}</p>
                <p>${events[i].dateTime.duration}</p>
              </div>
            </div>
            <div class="titlesEvent">
              <h1>${events[i].title}</h1>
              <p>${events[i].subtitle1}</p>
              <p>${events[i].subtitle2}</p>
            </div>
          </div>
    `;

    if(eventTime.getHours() > 20) {
      nightContainer.appendChild(cardElement);
    }else if(eventTime.getHours() > 13) {
      afternoonContainer.appendChild(cardElement);
    }else {
      morningContainer.appendChild(cardElement);
    }

    cardElement.addEventListener('click', () => {
        modal.style.display = "flex";

        console.log("cliquei")

        modalTitle.innerHTML = events[i].title;
        modalImage.src = events[i].image;
        modallocalName.innerHTML = events[i].localInfo.localName;
        modallocalSubname.innerHTML = events[i].localInfo.localSubname;
        modalemail.innerHTML = events[i].localInfo.email;
        modalcontact.innerHTML = events[i].localInfo.contact;
        modaleventInfo.innerHTML = events[i].eventInfo
        modaldate1.innerHTML = events[i].datesInfo.date1;
        modaldate2.innerHTML = events[i].datesInfo.date2;
        modaltime.innerHTML = events[i].dateTime.time;
        modalduration.innerHTML = events[i].dateTime.duration;
    })
    }
}

function getData(date) {
  fetch(`http://localhost:3000/events?dateTime=${date}`).then(function (response) {
      return response.json();
  })
  .then(function (events){
    agendaEvents(events)
  })
  .catch(function (error){
    console.error('Error:', error)
  })
}


/*FUNÇÕES PARA FILTRAR POR DIA E MÊS + OS DIAS DA SEMANA NOS BOTOÕES*/

const months = [
  "Janury",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September"
]

function onClickMonth(i, currentMonth) {
  const allMonthButtons = document.getElementsByClassName("buttonMonth");
  for(let a=0; a<allMonthButtons.length; a++) {
    allMonthButtons[a].className = "col buttonMonth";
  }

  const monthButton = document.getElementsByClassName("buttonMonth")[i];
  monthButton.className += " active"

  populateDays(i+currentMonth)
}

function populateMonths() {

  const currentMonth = TODAY.getMonth();

  for (let i = 0; i < 6; i++) {
    let buttonMonth = document.createElement('button');
    buttonMonth.className = "col buttonMonth";
    buttonMonth.innerHTML = `${months[i+currentMonth]}`;
    buttonMonth.setAttribute('onClick', `onClickMonth(${i}, ${currentMonth})`)
    //buttonDay.setAttribute('onClick', `getData('${months[i+currentMonth]} ${String(i+1).padStart(2, '0')}, 2024')`);
    MonthsContainer.appendChild(buttonMonth);
}
}


const daysWeek = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
]


function populateDays(month) {

  DaysCarrouselContainer.innerHTML = ""

  let dayscounter = 0

  const daysOfMonth = new Date(2024, month+1, 0).getDate()
  console.log(daysOfMonth)

  for (let i = 0; i < daysOfMonth; i++) {
    let buttonDay = document.createElement('button');
    buttonDay.className = "buttonDay";
    buttonDay.innerHTML = `<h5 class="dayofmonthB">${i+1}</h5> <p class="dayofweekB"> ${daysWeek[dayscounter]} </p>`;
    buttonDay.setAttribute('onClick', `getData('${months[month]} ${String(i+1).padStart(2, '0')}, 2024')`);
    DaysCarrouselContainer.appendChild(buttonDay);
    
    if (dayscounter == daysWeek.length-1 ) {
      dayscounter=0
    }
    else {
      dayscounter = dayscounter+1
    }
    

}
}


// Função para filtrar os eventos por data
function filterEventsByDate(events, selectedDate) {
  for (let i = 0; i < events.length; i++) {
      const eventDate = new Date(events[i].dateTime.time);
      if (eventDate.getDate() === selectedDate.getDate() && 
          eventDate.getMonth() === selectedDate.getMonth() && 
          eventDate.getFullYear() === selectedDate.getFullYear()) {
      }
  }
}

function formatDate(date) {
  const options = { month: 'long', day: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

populateMonths()
populateDays(TODAY.getMonth())
getData(formatDate(TODAY))