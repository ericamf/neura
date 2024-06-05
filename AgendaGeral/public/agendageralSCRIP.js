// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

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

// SLIDER BARRA DO PREÇO //

function setRange() {
  const event = new CustomEvent('range-set', {
    detail: {
      sliderId: 'yourSliderIdHere',
      minValue: 0, // The minimum value you want to set the slider to
      maxValue: 200, // The maximum value you want to set the slider to
    }
  });

  document.dispatchEvent(event);
}