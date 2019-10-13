//REFACTOR BELOW INTO OBJECT STRUCTURE 

var numberOfSquares = 6;
var colors = [];
var pickedColor;

var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");

init();
reset();

function init(){
  setupModeButtons();
  setUpSquares();
  reset();
}

function setupModeButtons(){
  for(var i=0; i < modeButtons.length;i++){
    modeButtons[i].addEventListener("click",function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      this.textContent==="Easy" ? numberOfSquares=3:numberOfSquares=6;

      reset();
    });
  }
}

function setUpSquares(){
  for(var i=0;i<squares.length;i++){
    //add listeners
    squares[i].addEventListener("click",function(){
      var clicked = this.style.backgroundColor;
      if(clicked===pickedColor){
        //match
        messageDisplay.textContent = "Correct!";
        h1.style.backgroundColor=clicked;
        changeColors(clicked);
        resetButton.textContent ="Play Again?";
      }else{
        //no match
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
      }
    });
  }
}

function reset(){
  colors = generateRandomColors(numberOfSquares);
  messageDisplay.textContent = "";
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for(var i = 0 ; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display="block";
      squares[i].style.backgroundColor = colors[i];
    }else{
      squares[i].style.display="none";
    }

  }
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click",function () {
  reset();
});

function generateRandomColors(num){
  var arr = [];
  for(var i = 0; i < num; i ++){
    arr.push(generateRandomColor());
  }
  return arr;
}

function generateRandomColor(){
  var rVal = Math.floor(Math.random()*256);
  var gVal = Math.floor(Math.random()*256);
  var bVal = Math.floor(Math.random()*256);
  return "rgb(" + rVal + ", " +gVal+ ", " + bVal +")";
}

function pickColor(){
  var randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
}

function changeColors(color){
  //loop through squares and change to match given
  for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}
