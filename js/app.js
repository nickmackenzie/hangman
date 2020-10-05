let river = document.getElementById("river");
let blank = " _";
let wordChoosen = "";
let tileLength = 0;
let wordArray = [];
let arrayWords = [
  "potatoes",
  "onions",
  "turnips",
  "oranges",
  "cow",
  "chessey",
  "pizza",
  "girl",
  "mackenzie",
];
let playBtn = document.getElementById("playBtn");
let playerInput = document.getElementById("player-guess");
let guessBtn = document.getElementById("guess-btn");
let blankWord = document.getElementById("word");
let waterfall = document.getElementById("waterfall");
let playerReset = document.getElementById("player");
let playerMover = 0;
let playerGuess = [];
let playerLife = wordArray.length;
let playerArray = [];
let correctAnswerArray = [];
let filledArray = [];
let blankey = document.createElement("div");
let scream = new Audio("/sounds/scream.mp3");
let playerOptions = {
  c1: "<img src='img/person.gif'>", c1: "<img src='img/person.gif'>", c1: "<img src='img/person.gif'>",
  easy: "easy", med: "medium", hard: "hard"
}
let playerTile = document.createElement("div");
let player = document.getElementById("player");




playBtn.addEventListener("click", playButton);
guessBtn.addEventListener("click", inputCheck);


function playerMoverFun() {
  return (playerMover = playerMover += 25);
}

function playButton() {
  player.innerHTML = playerOptions.c1
  player.style.removeProperty("margin-left");
  playerMover = 0;
  playerArray = [];
  wordChooser();
  tileMaker();
  blankMaker();
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
}


function wordChooser() {
  waterfall.style.display = "block";
  river.textContent = "";
  let wordChooser = Math.floor(Math.random() * 9);
  wordChoosen = arrayWords[wordChooser];
  playerLife = wordChoosen.length;
  wordArray = wordChoosen.split("");
  return wordChoosen;
}



function tileMaker() {
  tileLength = wordChoosen.length;
  let waterFallTile = wordArray.length - 1;
  let waterString = waterFallTile.toString()
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/watertile.png'>";
    river.append(newTile);
  });
}

function blankMaker() {
  filledArray = new Array(playerLife).fill("_ ");
  console.log(filledArray);
}
function winChecker() {
  var wordString = wordArray.toString();
  var playerString = filledArray.toString();
  if (wordString === playerString) {
    alert("you win");
  } else {
    return;
  }
}

function inputCheck() {
  let playerGuess = playerInput.value;
  if (playerArray.includes(playerGuess)) {
    playerInput.value = "";
    return alert("you already selected this letter");
  }
  if (wordArray.includes(playerGuess)) {
    wordArray.forEach(function (letter, position) {
      if (letter === playerGuess) {
        playerArray.splice(position, 0, playerGuess);
        filledArray.splice(position, 1, playerGuess);
        blankey.innerHTML = filledArray.join("");
        word.append(blankey);
        winChecker();
      }
    });

    playerInput.value = "";
  } else {
    playerMoverFun();
    player.style.marginLeft = playerMover + "px";
    console.log("not Correct");
    playerInput.value = "";
    playerLife = playerLife - 1;
    console.log(playerLife);
    if (playerLife === 0) {
      console.log("You Died");
      player.className = "scale-out-tr";
      scream.play();
    }
  }
}




