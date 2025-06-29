let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

const h2 = document.querySelector("h2");

// Display High Score
const highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.querySelector(".header").appendChild(highScoreDisplay);

// Start game from keypress or tap
document.addEventListener("keydown", startGame);
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];

    document.getElementById("startBtn").style.display = "none"; // 👈 Hide button after starting
    h2.innerText = "Game Started!";
    setTimeout(levelUp, 500);
  }
}

function playSound(color) {
  const soundUrls = {
    red: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    green: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    purple: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    wrong: "https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3"
  };

  const audio = new Audio(soundUrls[color]);
  audio.play();
}

function gameFlash(btn) {
  btn.classList.add("flash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randColor);

  const btn = document.getElementById(randColor);
  setTimeout(() => gameFlash(btn), 300);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    playSound("wrong");
    updateHighScore();
    h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key or tap to restart.`;
    document.getElementById("startBtn").style.display = "inline-block"; // 👈 Show button again
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 400);
    reset();
  }
}

function btnPress() {
  if (!started) return;
  const btn = this;
  const userColor = btn.id;

  userSeq.push(userColor);
  userFlash(btn);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", btnPress);
});

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
