// Get the modal
var modal = document.getElementById("myModal");

const modalTitle = document.getElementById('modal-title');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
 modal.style.display = "flex";
}

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

//GETTING OS EVENTOS DE 1 DE ABRIL DE MANHÃ//
function populateMorningEvents(events) {
    const morningContainer = document.getElementById('carrousel-morning');
    const aftermoonContainer = document.getElementById('carrousel-aftermoon');
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
                <p>2H</p>
              </div>
            </div>
            <div class="body">
              <h1>${events[i].title}</h1>
              <p></p>
              <p>Porto</p>
            </div>
          </div>
    `;

    if(eventTime.getHours() > 20) {
      nightContainer.appendChild(cardElement);
    }else if(eventTime.getHours() > 13) {
      aftermoonContainer.appendChild(cardElement);
    }else {
      morningContainer.appendChild(cardElement);
    }

    carrouselContainer.appendChild(cardElement);

    cardElement.addEventListener('click', () => {
        modal.style.display = "flex";

        modalTitle.innerHTML = events[i].title;
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