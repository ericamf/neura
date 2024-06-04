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

var titleMin = document.getElementById('title-min');
var titleMax = document.getElementById('title-max');

var inputLeft = document.getElementById('input-left');
var inputRight = document.getElementById('input-right');

var dotLeft = document.getElementById('dot-left');
var dotRight = document.getElementById('dot-right');

var sliderRange = document.getElementById('slider-ranger');

function setLeftValue()
{
  let value = this.value;
  let min = parseInt(this.min);
  let max = parseInt(this.max);

  value = Math.min(parseInt(value), parseInt(inputRight.value) -1);

  let percent = ((value - min) / (max - min)) * 100;
  
  sliderRange.style.left = percent + '%';
  dotLeft.style.left = percent + '%';
  titleMin.innerText = value;

}

function setRightValue()
{
  let value = this.value;
  let min = parseInt(this.min);
  let max = parseInt(this.max);

  value = Math.max(parseInt(value), parseInt(inputLeft.value) +1);

  let percent = ((value - min) / (max - min)) * 100;
  
  sliderRange.style.left = (100 - percent) + '%';
  dotRight.style.right = (100 - percent)  + '%';
  titleMax.innerText = value;
}

inputLeft.addEventListener('input', setLeftValue );
inputRight.addEventListener('input', setRightValue );
