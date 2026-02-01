// Selection of words the game can randomly choose from
const wordList = [
  "APPLE",
  "GRAPE",
  "PLANT",
  "STONE",
  "MOUSE",
  "CHAIR",
  "BREAD",
  "SMILE",
  "FLOOR",
  "CLOUD",
  "HEART",
  "GREEN",
  "RIVER",
  "PEACH",
  "PLANE",
  "BRICK",
  "WATER",
  "MUSIC",
  "LIGHT",
  "HONEY",
  "SOUND",
  "TABLE",
  "BERRY",
  "LEMON",
  "NIGHT",
  "SUGAR",
  "SHOES",
  "GRASS",
  "SHEEP",
  "TOAST",
  "MAGIC",
  "SNAKE",
  "CROWN",
  "SMOKE",
  "TRAIN",
  "SPARK",
  "DREAM",
];

// Pick one random word to be the answer
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];

const wordLength = 5;
let triesUsed = 0;
const triesAllowed = 6;
let gameFinished = false;

// Grabs the parts of the page that need to be updated
const gameBoard = document.getElementById("gameBoard");
const playerGuess = document.getElementById("playerGuess");
const message = document.getElementById("message");
const enterButton = document.getElementById("enterButton");

// Put info message on the screen (tries left, win/lose)
function showText(text) {
  message.textContent = text;
}

function updateTriesLeft() {
  showText("Tries left: " + (triesAllowed - triesUsed));
}

// Decides the color for each letter in the guess
function getTileColors(guessWord) {
  const colors = Array(wordLength).fill("gray");
  const secretLetters = secretWord.split("");

  // First - finds correct letters in the correct position and turns them green
  for (let i = 0; i < wordLength; i++) {
    if (guessWord[i] === secretLetters[i]) {
      colors[i] = "green";
      secretLetters[i] = null;
    }
  }

  // Second - finds remaining correct letters but in wrong position and turns them yellow
  for (let i = 0; i < wordLength; i++) {
    if (colors[i] !== "green") {
      const matchIndex = secretLetters.indexOf(guessWord[i]);
      if (matchIndex !== -1) {
        colors[i] = "yellow";
        secretLetters[matchIndex] = null;
      }
    }
  }

  return colors;
}

// Creates one row of tiles for the current guess
function addGuessRow(guessWord) {
  const colors = getTileColors(guessWord);

  for (let i = 0; i < wordLength; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = guessWord[i];

    tile.classList.add(colors[i]);

    gameBoard.appendChild(tile);
  }
}

function enterGuess() {
  if (gameFinished) return;

  // Ensures guess is in uppercase so it matches word list
  const guessWord = playerGuess.value.toUpperCase().trim();

  // Checks that the guess is valid.
  if (guessWord.length !== wordLength) {
    showText("Please type " + wordLength + " letters.");
    return;
  }

  if (!/^[A-Z]+$/.test(guessWord)) {
    showText("Please use only letters (A-Z).");
    return;
  }

  // Displays guess then updates game state
  addGuessRow(guessWord);
  playerGuess.value = "";
  triesUsed++;

  if (guessWord === secretWord) {
    showText("You win! 🎉");
    gameFinished = true;
  } else if (triesUsed >= triesAllowed) {
    showText("You lost. The word was " + secretWord + ".");
    gameFinished = true;
  } else {
    updateTriesLeft();
  }
}

// Allows user to submit guess with button
enterButton.addEventListener("click", enterGuess);

// Allows user to submit guess by pressing Enter key
playerGuess.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    enterGuess();
  }
});

// Puts cursor in input box and shows the initial 'tries left' message
playerGuess.focus();
updateTriesLeft();
