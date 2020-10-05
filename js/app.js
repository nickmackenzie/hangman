let river = document.getElementById("river");
let blank = " _";
let wordChoosen = "";
let tileLength = 0;
let wordArray = [];
let arrayWords = [
  "camping",
  "tent",
  "fire",
  "trees",
  "hatchet",
  "animals",
  "canada",
  "canoe",
  "lakes",
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
  c1: "<img src='img/person.gif'>",
  c1: "<img src='img/person.gif'>",
  c1: "<img src='img/person.gif'>",
  easy: "easy",
  med: "medium",
  hard: "hard",
};
let playerTile = document.createElement("div");
let player = document.getElementById("player");
let guessDiv = document.getElementById("guessed");
let guessedLetters = [];

let hints = {
  hint1:
    "the activity of spending a vacation living in a camp, tent, or camper.",
  hint2:
    "a portable shelter made of cloth, supported by one or more poles and stretched tight by cords or loops attached to pegs driven into the ground.",
  hint3:
    "the rapid oxidation of a material in the exothermic chemical process of combustion, releasing heat, light, and various reaction products.",
  hint4:
    "a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground.",
  hint5: "a small axe with a short handle for use in one hand.",
  hint6:
    "a living organism that feeds on organic matter, typically having specialized sense organs and nervous system and able to respond rapidly to stimuli.",
  hint7: "a country in North America: the second largest country in the world.",
  hint8:
    "a narrow, keelless boat with pointed ends, propelled by a paddle or paddles.",
  hint9: "a large body of water surrounded by land.",
};

let hintBtn = document.getElementById("show-hint");
let hintBox = document.getElementById("hint");
let wordChooserBrain = Math.floor(Math.random() * 9);

playBtn.addEventListener("click", playButton);
guessBtn.addEventListener("click", inputCheck);
hintBtn.addEventListener("click", showHint);

function playerMoverFun() {
  return (playerMover = playerMover += 45);
}

function playButton() {
  gameReset();
  wordChooser();
  tileMaker();
  blankMaker();
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
  setTimeout(function () {
    player.className = "";
  }, 600);
}

function gameReset() {
  player.innerHTML = playerOptions.c1;
  player.style.removeProperty("margin-left");
  player.className = "slide-in-left";
  guessDiv.innerHTML = "";
  playerMover = 0;
  playerArray = [];
}

function wordChooser() {
  waterfall.style.display = "block";
  river.textContent = "";
  wordChoosen = arrayWords[wordChooserBrain];
  playerLife = wordChoosen.length;
  wordArray = wordChoosen.split("");
  return wordChoosen;
}

function tileMaker() {
  tileLength = wordChoosen.length;
  let waterFallTile = wordArray.length - 1;
  let waterString = waterFallTile.toString();
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

  guessedLetters.push(playerGuess);
  guessDiv.innerHTML = guessedLetters;

  console.log(guessedLetters);
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
      player.className = "scale-out-right";
      scream.play();
    }
  }
}

function showHint() {
  hintBox.innerHTML = hints.hint1;
}
