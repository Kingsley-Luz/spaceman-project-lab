/*-------------------------------- Constants --------------------------------*/
const maxGuesses = 6;
const gameTimeLimit = 45;
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
let timer;
/*------------------------ Cached Element References ------------------------*/
const wordDisplay = 
    document.querySelector(".word-display");
const keyboardDiv = 
    document.querySelector(".keyboard");
const spacemanImage = 
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
  clearInterval(timer);
  startTimer();
  render();
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
  render()
};

const startTimer = () => {
  let timeLeft = gameTimeLimit;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time left:
    ${Math.floor(timeLeft / 60)}:${
      timeLeft % 60 < 10 ? "0" : ""
    }${timeLeft % 60}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver(false);
    }
  }, 1000);
};
const gameOver = (isVictory) => {
  setTimeout(() => {
    clearInterval(timer);
    const modalText = isVictory
      ? ` Yeah! You won:`
      : `You Loss! The correct word was:`;
    gameModal.querySelector(
      "p"
    ).innerHTML = 
    `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};
const init= (button, clickedLetter) => {
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
   
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) 
    return gameOver(false);
    if (correctLetters.length === currentWord.length)
    return gameOver(true);
render()
};



/*----------------------------- Event Listeners -----------------------------*/
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    init(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
