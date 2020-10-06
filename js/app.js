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
let winNotification = document.getElementById("notification-winner");
let lostNotification = document.getElementById("notification-lost");

let hint = {
  0: "the activity of spending a vacation living in a camp, tent, or camper.",
  1: "a portable shelter made of cloth, supported by one or more poles and stretched tight by cords or loops attached to pegs driven into the ground.",
  2: "the rapid oxidation of a material in the exothermic chemical process of combustion, releasing heat, light, and various reaction products.",
  3: "a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground.",
  4: "a small axe with a short handle for use in one hand.",
  5: "a living organism that feeds on organic matter, typically having specialized sense organs and nervous system and able to respond rapidly to stimuli.",
  6: "a country in North America: the second largest country in the world.",
  7: "a narrow, keelless boat with pointed ends, propelled by a paddle or paddles.",
  8: "a large body of water surrounded by land.",
};

let hintBtn = document.getElementById("show-hint");
let hintBox = document.getElementById("hint");

let wordChooserBrain;

playBtn.addEventListener("click", playButton);
guessBtn.addEventListener("click", inputCheck);
hintBtn.addEventListener("click", showHint);

playerInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    inputCheck();
  }
});

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
  guessedLetters = [];
  guessDiv.textContent = "";
  playerMover = 0;
  hintBox.style.display = "none";
  playerArray = [];
}

function wordChooser() {
  wordChooserBrain = Math.floor(Math.random() * 9);
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
    winNotification.className = "slide-in-bottom";
    winNotification.style.display = "block";
    setTimeout(function () {
      winNotification.className = "slide-out-bottom";
    }, 1250);
  } else {
    return;
  }
}

function inputCheck() {
  let playerGuess = playerInput.value;

  guessedLetters.push(playerGuess);
  guessDiv.innerHTML = guessedLetters;
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
      lostNotification.className = "slide-in-bottom";
      lostNotification.style.display = "block";
      player.className = "scale-out-right";
      setTimeout(function () {
        lostNotification.className = "slide-out-bottom";
      }, 1250);
      scream.play();
    }
  }
}

function showHint() {
  hintBox.innerHTML = hint[wordChooserBrain];
  if (hintBox.innerHTML === "undefined") {
    hintBox.innerHTML = "You need to start the game to get a hint!";
  }
  if (hintBox.style.display === "flex") {
    hintBox.style.display = "none";
  } else {
    hintBox.style.display = "flex";
  }
}
