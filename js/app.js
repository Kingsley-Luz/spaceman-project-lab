/*-------------------------------- Constants --------------------------------*/
const maxGuesses = 6;
const gameTimeLimit = 60;
const codingQuiz = [
  {
    word: "elephant",
    hint: "One of the largest land animals.",
  },
  {
    word: "moon",
    hint: "Natural satellite of the earth.",
  },
  {
    word: "guitar",
    hint: "Musical instrument.",
  },
  {
    word: "pizza",
    hint: "Round dish, baked in an oven.",
  },
  {
    word: "airplane",
    hint: "Flying vehicle.",
  },
  {
    word: "volcano",
    hint: "A type of mountain.",
  },
  {
    word: "grape",
    hint: "A fruit.",
  },
  {
    word: "microscope",
    hint: "Helps you see things"
  },
  {
    word: "tire",
    hint: "Every car has this.",
  },
  {
    word: "parrot",
    hint: "A type of bird.",
  },
];

/*---------------------------- Variables (state) ----------------------------*/
let currentWord;
let correctLetters;
let wrongGuessCount;
let timerInterval;
/*------------------------ Cached Element References ------------------------*/
const wordDisplay = 
    document.querySelector(".word-display");
const keyboardDiv = 
    document.querySelector(".keyboard");
const hangmanImage = 
    document.querySelector(".spaceman-box-img");
const guessesText = 
    document.querySelector(".guesses-text b");
const gameModal = 
    document.querySelector(".game-modal");
const playAgainBtn = 
    document.querySelector(".play-again");
const timerDisplay = 
    document.querySelector(".timer");

/*-------------------------------- Functions --------------------------------*/
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  clearInterval(timerInterval);
  startTimer();
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } =
    codingQuiz[Math.floor(Math.random() 
    * codingQuiz.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b")
  .innerText = hint;
  resetGame();
};

const startTimer = () => {
  let timeLeft = gameTimeLimit;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time left:
    ${Math.floor(timeLeft / 60)}:${
      timeLeft % 60 < 10 ? "0" : ""
    }${timeLeft % 60}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver(false);
    }
  }, 1000);
};
const gameOver = (isVictory) => {
  setTimeout(() => {
    clearInterval(timerInterval);
    const modalText = isVictory
      ? ` Yeah! You found the word:`
      : `You Loss! The correct word was:`;
    gameModal.querySelector(
      "p"
    ).innerHTML = 
    `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};
const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index]
        .innerText = letter;
        wordDisplay.querySelectorAll("li")[index]
        .classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    if (wrongGuessCount === 0) {
      spacemanImage.src = 
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215173028/0.png`;
    }
    if (wrongGuessCount === 1) {
      spacemanImage.src = 
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215173033/1.png`;
    }
    if (wrongGuessCount === 2) {
      spacemanImage.src = 
      
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215173038/2.png`;
    }
    if (wrongGuessCount === 3) {
      spacemanImage.src = 
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215172733/3.png`;
    }
    if (wrongGuessCount == 4) {
      spacemanImage.src = 
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215173815/4.png`;
    }
    if (wrongGuessCount === 5) {
      spacemanImage.src = 
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215173859/5.png`;
    }
    if (wrongGuessCount === 6) {
      spacemanImage.src =
      `https://media.geeksforgeeks.org/wp-content
      /uploads/20240215173931/6.png`;
    }
    
    `images/spaceman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) 
  return gameOver(false);
  if (correctLetters.length === currentWord.length)
  return gameOver(true);
};


/*----------------------------- Event Listeners -----------------------------*/
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
