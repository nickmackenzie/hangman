
let river = document.getElementById("river")
let blank = " _"
let wordChoosen = ""
let tileLength = 0;
let wordArray = []
let arrayWords = ['potatoes', 'carrots', 'onions', 'turnips']
let playBtn = document.getElementById("playBtn")
let playerInput = document.getElementById("player-guess")
let guessBtn = document.getElementById("guess-btn")
let playerMover = 0;
let playerGuess = []



function playerMoverFun() {
    return playerMover = playerMover += 25;

}



playBtn.addEventListener('click', playButton)
guessBtn.addEventListener("click", inputCheck)


function playButton() {
    wordChooser()
    wordSpliter()
    tileMaker()
}
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}
function inputCheck() {
    let player = document.getElementById("player")
    let playerGuess = playerInput.value
    let playerArray = []
    if (wordArray.includes(playerGuess)) {
        let inxPos = wordArray.indexOf(playerGuess)
        let arrayofPlayer = []
        for (idx = 0; idx < wordArray.length; idx++) {
            if (wordArray[idx] === playerGuess)
                playerArray = playerArray + playerArray.splice(idx, 0, playerGuess)
        }
        arrayofPlayer.splice(1, 0, playerGuess)
        console.log(inxPos)
        console.log(playerGuess)
        console.log(arrayofPlayer)
        console.log("Correct")
        playerInput.value = ""

    } else {
        playerMoverFun()
        player.style.marginLeft = playerMover + "px"
        console.log("not Correct")
        playerInput.value = ""

    }
}
function wordSpliter() {
    wordArray = wordChoosen.split("")
    console.log(wordArray)
}


// function winChecker()

function tileMaker() {
    tileLength = wordChoosen.length;
    let tileString = tileLength.toString()
    wordArray.forEach(function (word, idx) {
        let newTile = document.createElement("div")
        newTile.className = "water"
        newTile.id = idx
        river.append(newTile)
        if (newTile.id === "0") {
            let playerTile = document.createElement("div")
            playerTile = newTile
            newTile.style.backgroundColor = "yellow"
            newTile.className = "player"
            newTile.style.width = "25px"
            newTile.style.height = "25px"
            newTile.style.position = "absolute"
            newTile.id = "player"
        }
    })


}

function wordChooser() {
    river.textContent = ""
    let wordChooser = Math.floor(Math.random() * 100);
    wordChoosen = arrayWords[wordChooser];
    return wordChoosen
}



