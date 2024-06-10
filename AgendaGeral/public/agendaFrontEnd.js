// Get the modal
var modal = document.getElementById("myModal");

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

//GETTING OS EVENTOS//
function populateMorningEvents(events) {
    const morningContainer = document.getElementById('carrousel-morning');
    const afternoonContainer = document.getElementById('carrousel-afternoon');
    const nightContainer = document.getElementById('carrousel-night');

    console.log("Cheguei aqui")
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
            <div class="body">
              <h1>${events[i].title}</h1>
              <p>${events[i].subtitle1}</p>
              <p>${events[i].subtitle2}</p>
            </div>
          </div>
    `;

    if(eventTime.getHours() > 20) {
      nightContainer.appendChild(cardElement);
    }else if(eventTime.getHours() > 13) {
      console.log(events[i])
      afternoonContainer.appendChild(cardElement);
    }else {
      morningContainer.appendChild(cardElement);
    }

    cardElement.addEventListener('click', () => {
        modal.style.display = "flex";

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







fetch("http://localhost:3000/events").then(function (response) {
    return response.json();
})
.then(function (events){
    populateMorningEvents(events)
})
.catch(function (error){
  console.error('Error:', error)
})