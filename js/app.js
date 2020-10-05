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
let playerMover = 0;
let playerGuess = [];
let playerLife = wordArray.length;
let playerArray = [];
let correctAnswerArray = [];
let filledArray = [];
let blankey = document.createElement("div");
let scream = new Audio("/sounds/scream.mp3");
// let playerCanoe = { c1: "<img src='img/person.gif'>" }
let playerCanoe = { c1: "<img src='img/giphy.gif'>" }


playBtn.addEventListener("click", playButton);
guessBtn.addEventListener("click", inputCheck);


function playerMoverFun() {
  return (playerMover = playerMover += 25);
}

function playButton() {
  playerArray = [];
  wordChooser();
  wordSpliter();
  tileMaker();
  blankMaker();
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
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
  let player = document.getElementById("player");
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

function wordSpliter() {
  wordArray = wordChoosen.split("");
  console.log(wordArray);
}

function tileMaker() {
  tileLength = wordChoosen.length;
  let tileString = tileLength.toString();
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/watertile.png'>";
    river.append(newTile);
    if (newTile.id === "0") {
      let playerTile = document.createElement("div");
      playerTile = newTile;
      playerTile.className = "player slide-in-left";
      playerTile.style.width = "25px";
      playerTile.style.height = "25px";
      playerTile.style.position = "absolute";
      playerTile.style.marginTop = "50px";
      playerTile.id = "player";
      playerTile.innerHTML = playerCanoe.c1;
    }
  });
}

function wordChooser() {
  waterfall.style.display = "block";
  river.textContent = "";
  let wordChooser = Math.floor(Math.random() * 9);
  wordChoosen = arrayWords[wordChooser];
  playerLife = wordChoosen.length;
  return wordChoosen;
}
