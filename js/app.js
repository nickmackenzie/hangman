let river = document.getElementById("river");
let blank = " _";
let wordChoosen = "";
let tileLength = 0;
let wordArray = [];
let arrayWords = ["potatoes", "onions", "turnips"];
let playBtn = document.getElementById("playBtn");
let playerInput = document.getElementById("player-guess");
let guessBtn = document.getElementById("guess-btn");
let blankWord = document.getElementById("word");
let playerMover = 0;
let playerGuess = [];
let playerLife = wordArray.length;
let playerArray = [];
let correctAnswerArray = [];
let filledArray = [];
let blankey = document.createElement("div");

function playerMoverFun() {
  return (playerMover = playerMover += 25);
}

playBtn.addEventListener("click", playButton);
guessBtn.addEventListener("click", inputCheck);

function playButton() {
  wordChooser();
  wordSpliter();
  tileMaker();
  blankMaker();
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
    if (playerLife === 2) {
      console.log("You Died");
    }
  }
}
function wordSpliter() {
  wordArray = wordChoosen.split("");
  console.log(wordArray);
}

// function winChecker()

function tileMaker() {
  tileLength = wordChoosen.length;
  let tileString = tileLength.toString();
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/water.png'>";
    river.append(newTile);
    if (newTile.id === "0") {
      let playerTile = document.createElement("div");
      playerTile = newTile;
      newTile.className = "player slide-in-left";
      newTile.style.width = "25px";
      newTile.style.height = "25px";
      newTile.style.position = "absolute";
      newTile.id = "player";
      newTile.innerHTML = "<img src='img/person.gif'>";
    }
  });
}

function wordChooser() {
  river.textContent = "";
  let wordChooser = Math.floor(Math.random() * 3);
  wordChoosen = arrayWords[wordChooser];
  playerLife = wordChoosen.length;
  return wordChoosen;
}
