//<!--HTML Selectors-->//
let river = document.getElementById("river");
let playBtn = document.getElementById("playBtn");
let playerInput = document.getElementById("player-guess");
let playerInputArcade = document.getElementById("arcade-guess");
let blankWord = document.getElementById("word");
let waterfall = document.getElementById("waterfall");
let playerReset = document.getElementById("player");
let winNotification = document.getElementById("notification-winner");
let lostNotification = document.getElementById("notification-lost");
let playerTile = document.createElement("div");
let player = document.getElementById("player");
let guessDiv = document.getElementById("guessed");
let hintBtn = document.getElementById("show-hint");
let hintBox = document.getElementById("hint");
let normalModeBtn = document.getElementById("normal-mode");
let arcadeModeBtn = document.getElementById("arcade-mode");
let arcadeContainer = document.getElementById("campaign-container");
let modeBtn = document.getElementById("modeBtn");
let playInfoBox = document.getElementById("playerInfo");
let gamemodePopup = document.getElementById("gamemode");
let normalModeContainer = document.getElementById("normalInput");
let redBtn = document.getElementById("red");
let yellowBtn = document.getElementById("yellow");
let purpleBtn = document.getElementById("purple");
let speechBubble = document.querySelector("div.speech-bubble");
let trophyBox = document.getElementById("trophyBox");
let trophyTxt = document.getElementById("trophy-txt");
//<!--Trophy Selectors-->//
let tr1 = document.getElementById("tr1");
let tr2 = document.getElementById("tr2");
let tr3 = document.getElementById("tr3");
let tr4 = document.getElementById("tr4");
let tr5 = document.getElementById("tr5");
//<!--HTML Creators-->//
let blankey = document.createElement("div");
let scream = new Audio("sounds/screamfall.mp3");
let unlocked = new Audio("sounds/unlocked.mp3");
let splash = new Audio("sounds/splash.wav");

let blank = " _";

//<!-- Word/Array variables-->//
let playerArray = [];
let correctAnswerArray = [];
let filledArray = [];
let wordArray = [];
let guessedLetters = [];
let wordChoosen = "";
let achievementCounter = 0;
let firsTimeLogin = false;
let trophyAchieved = false;
let normalGamesWon = 0;
let normalGamesLost = 0;
let hintCounter = 0;
let arcadeGamesWon = 0;
//<!--Game state-->//
let playerMover = 0;
let playerGuess = [];
let playerLife = wordArray.length;
let wordChooserBrain;

//<!--Game database-->//
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

let playerOptions = {
  c1: `<lottie-player src="img/kayak/red.json" background="transparent" speed="1" style="width: 100px; height: 100px;transform: rotate(45deg);" loop autoplay></lottie-player>`,
  c2: `<lottie-player src="img/kayak/yellow.json"  background="transparent"  speed="1"  style="width: 100; height: 100px;transform: rotate(45deg);"  loop  autoplay></lottie-player>
  `,
  c3: `<lottie-player src="img/kayak/purple.json" background="transparent" speed="1" style="width: 100px; height: 100px; transform: rotate(45deg)" loop autoplay></lottie-player>`,
};
let trophyList = {
  trophy1: false,
  trophy2: false,
  trophy3: false,
  trophy4: false,
  trophy5: false,
};
//<!--Event Listeners-->//
playBtn.addEventListener("click", playButton);
hintBtn.addEventListener("click", showHint);
normalModeBtn.addEventListener("click", playButton);
arcadeModeBtn.addEventListener("click", playCampaign);
modeBtn.addEventListener("click", showPopup);
redBtn.addEventListener("click", colorChoice);
yellowBtn.addEventListener("click", colorChoice);
purpleBtn.addEventListener("click", colorChoice);
playerInputArcade.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) inputCheckCampaign();
});
playerInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) inputCheck();
});

//<!--Game Functions-->//

function playButton() {
  clearInterval(countDownInterval);
  playInfoBox.style.display = "none";
  gamemode.style.display = "none";
  normalModeContainer.style.display = "flex";
  firsTimeLogin = true;
  gameReset();
  wordChooser();
  tileMaker();
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
  speechBubble.innerText = "Need a hint? Click me!";
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
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/watertile.png'>";
    filledArray = new Array(playerLife).fill("_ ");
    river.append(newTile);
  });
}

function winChecker() {
  var wordString = wordArray.toString();
  var playerString = filledArray.toString();
  if (wordString === playerString) {
    normalGamesWon = normalGamesWon + 1;
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
    //<--This is what move the player when the answer is wrong. I can adjust this in px-->//
    splash.play();
    playerMover = playerMover += 45;
    player.style.marginLeft = playerMover + "px";
    playerInput.value = "";
    playerLife = playerLife - 1;
    if (playerLife === 0) {
      normalGamesLost = normalGamesLost + 1;
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
  if (speechBubble.className === "speech-bubble") {
    speechBubble.innerHTML = hint[wordChooserBrain];
    speechBubble.className === "active speech-bubble";
    hintCounter = hintCounter + 1;
  }
  if (speechBubble.className === "active speech-bubble") {
    speechBubble.className === "speech-bubble";
    speechBubble.innerHTML = "click me for hints!";
  }
  if (speechBubble.innerHTML === "undefined") {
    speechBubble.innerHTML = "You have to start a game to get hints!";
    hintCounter = hintCounter + 1;
  }
}

//Campaign Area

var x = document.getElementById("countdown");
let playerScore = 0;
let playerHealth = 10;

let campBtn = document.getElementById("campBtn");
let score = document.getElementById("player-score");
campBtn.addEventListener("click", playCampaign);
let countDownInterval;

function playCampaign() {
  gameResetCampaign();
  speechBubble.innerText = "Need a hint? Click me!";
  playerHealth = 10;
  heart = [
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
    `<i class="fas fa-heart"></i>`,
  ];
  playInfoBox.style.display = "block";
  gamemode.style.display = "none";
  arcadeContainer.style.display = "flex";
  countDownInterval = setInterval(countdownTimer, 1200);
  player.className = "slide-in-left";
  wordChooserCampaign();
  tileMakerCampaign();
  playerBar.innerHTML = heart.join("");
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
  setTimeout(function () {
    player.className = "";
  }, 600);
}
function continueCampaign() {
  speechBubble.innerText = "Need a hint? Click me!";
  player.innerHTML = playerOptions.c1;
  player.style.removeProperty("margin-left");
  player.className = "slide-in-left";
  guessedLetters = [];
  guessDiv.textContent = "";
  playerMover = 0;
  hintBox.style.display = "none";
  playerArray = [];
  gamemodeSwitch = false;
  playInfoBox.style.display = "block";
  gamemode.style.display = "none";
  arcadeContainer.style.display = "flex";
  wordChooserCampaign();
  tileMakerCampaign();
  playerBar.innerHTML = heart.join("");
  blankey.innerHTML = filledArray.join("");
  word.append(blankey);
  setTimeout(function () {
    player.className = "";
  }, 600);
}
function countdownTimer() {
  x.value = x.value += 1;
  if (x.value === 100) {
    x.value = 0;
    clearInterval(countDownInterval);
    lostNotification.className = "slide-in-bottom";
    lostNotification.style.display = "block";
    player.className = "scale-out-right";
    playCampaign();
    setTimeout(function () {
      lostNotification.className = "slide-out-bottom";
    }, 2000);
  }
}
function gameResetCampaign() {
  speechBubble.innerText = "Need a hint? Click me!";
  score.innerText = "1";
  x.value = "0";
  player.innerHTML = playerOptions.c1;
  player.style.removeProperty("margin-left");
  player.className = "slide-in-left";
  guessedLetters = [];
  playerScore = 1;
  playerHealth = 10;
  guessDiv.textContent = "";
  playerMover = 0;
  hintBox.style.display = "none";
  playerArray = [];
}

function wordChooserCampaign() {
  wordChooserBrain = Math.floor(Math.random() * 9);
  waterfall.style.display = "block";
  river.textContent = "";
  wordChoosen = arrayWords[wordChooserBrain];
  playerLife = wordChoosen.length;
  wordArray = wordChoosen.split("");
  return wordChoosen;
}

function tileMakerCampaign() {
  wordArray.forEach(function (word, idx) {
    let newTile = document.createElement("div");
    newTile.className = "water";
    newTile.id = idx;
    newTile.innerHTML = "<img src='img/watertile.png'>";
    filledArray = new Array(playerLife).fill("_ ");
    river.append(newTile);
  });
}

function winCheckerCampaign() {
  var wordString = wordArray.toString();
  var playerString = filledArray.toString();
  if (wordString === playerString) {
    continueCampaign();
    winNotification.className = "slide-in-bottom";
    winNotification.style.display = "block";
    arcadeGamesWon = arcadeGamesWon + 1;
    playerScore = playerScore + 1;
    score.innerText = playerScore;
    setTimeout(function () {
      winNotification.className = "slide-out-bottom";
    }, 1250);
  } else {
    return;
  }
}

function inputCheckCampaign() {
  let playerGuess = playerInputArcade.value;
  guessedLetters.push(playerGuess);
  guessDiv.innerHTML = guessedLetters;
  if (playerArray.includes(playerGuess)) {
    playerInputArcade.value = "";
    return alert("you already selected this letter");
  }
  if (wordArray.includes(playerGuess)) {
    wordArray.forEach(function (letter, position) {
      if (letter === playerGuess) {
        playerArray.splice(position, 0, playerGuess);
        filledArray.splice(position, 1, playerGuess);
        blankey.innerHTML = filledArray.join("");
        word.append(blankey);
        winCheckerCampaign();
      }
    });
    playerInputArcade.value = "";
  } else {
    //<--This is what move the player when the answer is wrong. I cant adjust this in px-->//
    playerMover = playerMover += 20;
    player.style.marginLeft = playerMover + "px";
    playerInputArcade.value = "";
    playerHealth = playerHealth - 1;
    playerHealthBar();
    if (playerHealth === 0) {
      lostNotification.className = "slide-in-bottom";
      clearInterval(countDownInterval);
      lostNotification.style.display = "block";
      player.className = "scale-out-right";
      playCampaign();
      setTimeout(function () {
        lostNotification.className = "slide-out-bottom";
      }, 1250);
      heart = [
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-heart"></i>`,
      ];
      // playCampaign();
      scream.play();
    }
  }
}
function showHint() {
  if (speechBubble.className === "speech-bubble") {
    speechBubble.innerHTML = hint[wordChooserBrain];
    speechBubble.className === "active speech-bubble";
    hintCounter = hintCounter + 1;
  }
  if (speechBubble.className === "active speech-bubble") {
    speechBubble.className === "speech-bubble";
    speechBubble.innerHTML = "click me for hints!";
  }
  if (speechBubble.innerHTML === "undefined") {
    speechBubble.innerHTML = "You have to start a game to get hints!";
    hintCounter = hintCounter + 1;
  }
}

let heart = [
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
  `<i class="fas fa-heart"></i>`,
];
let joinedHeart = heart.join("");
let playerBar = document.getElementById("player-health");
playerBar.innerHTML = heart.join("");

function playerHealthBar() {
  heart.splice(playerHealth, 1, `<i class="far fa-heart"></i>`);
  playerBar.innerHTML = heart.join("");
}

function showPopup() {
  if (gamemodePopup.style.display === "none") {
    arcadeContainer.style.display = "none";
    normalModeContainer.style.display = "none";
    gamemodePopup.className = "fade-in-fwd";
    gamemodePopup.style.display === "flex";
  }
  if (gamemodePopup.style.display === "flex") {
    gamemodePopup.style.display = "none";
    gamemode.style.display = "none";
    gamemodePopup.className = "fade-out-bck";
    normalModeContainer.style.display = "none";
  } else {
    gamemodePopup.style.display = "flex";
  }
}

window.setInterval(function () {
  if (firsTimeLogin === true && achievementCounter === 0) {
    firsTimeLogin = false;
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyTxt.innerText = "First Time Playing!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (normalGamesWon === 1 && trophyList.trophy1 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy1 = true;
    trophyTxt.innerText = "You Won Your First Game!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    tr1.style.filter = "none";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (normalGamesWon === 5 && trophyList.trophy2 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy2 = true;
    trophyTxt.innerText = "You won 5 normal games!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    tr2.style.filter = "none";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (normalGamesLost === 1 && trophyList.trophy3 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy3 = true;
    trophyTxt.innerText = "You lost your first game!";
    trophyBox.style.display = "flex";
    trophyBox.className = "slide-in-bottom";
    tr3.style.filter = "none";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }

  if (arcadeGamesWon >= 5 && trophyList.trophy4 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy4 = true;
    trophyTxt.innerText = "You won 5 games of Arcade mode.";
    trophyBox.style.display = "flex";
    tr4.style.filter = "none";
    trophyBox.className = "slide-in-bottom";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
  if (hintCounter >= 5 && trophyList.trophy5 === false) {
    unlocked.play();
    achievementCounter = achievementCounter + 1;
    trophyList.trophy5 = true;
    trophyTxt.innerText = "You need alot of hints...";
    trophyBox.style.display = "flex";
    tr5.style.filter = "none";
    trophyBox.className = "slide-in-bottom";
    setTimeout(() => {
      trophyBox.className = "slide-out-bottom";
    }, 3000);
  }
}, 7000);

function colorChoice(e) {
  if (e.target.id === "red") {
    player.innerHTML = playerOptions.c1;
  }
  if (e.target.id === "yellow") {
    player.innerHTML = playerOptions.c2;
  }
  if (e.target.id === "purple") {
    player.innerHTML = playerOptions.c3;
  }
}
