import "./css/style.css";
import Player from "./js/player";

const WIN_SCORE = 10;

const btnNewGame = document.getElementById("btnNewGame");
const btnRolldice = document.getElementById("btnRolldice");
const btnHold = document.getElementById("btnHold");
const imgDice = document.getElementById("dice");

const firstPlayer = new Player("firstPlayer");
const secondPlayer = new Player("secondPlayer");

let hold = false;
let currentPlayer = firstPlayer;
let opposingPlayer = secondPlayer;

currentPlayer.active();

btnNewGame.addEventListener("click", handlebtnNewGame);
btnRolldice.addEventListener("click", handleBtnRolldice);
btnHold.addEventListener("click", handleBnHold);

function handlebtnNewGame() {
  btnHold.disabled = false;
  btnRolldice.disabled = false;

  currentPlayer.init();
  opposingPlayer.init();
}

async function handleBtnRolldice() {
  btnRolldice.disabled = true;
  const dice = await rolldice();

  if (hold) {
    if (dice === 1) {
      currentPlayer.roundScore = 0;
      btnRolldice.disabled = false;
    } else {
      currentPlayer.score = currentPlayer.roundScore + dice;
      if (currentPlayer.score >= WIN_SCORE) {
        currentPlayer.win();
        opposingPlayer.lose();
        btnHold.disabled = true;
      }
    }
    exchangePlayer();
  } else {
    currentPlayer.roundScore = dice + currentPlayer.roundScore;
    btnRolldice.disabled = false;
  }
}

function handleBnHold() {
  hold = !hold;
  btnHold.classList.toggle("btn-active");
}

function exchangePlayer() {
  if (currentPlayer === firstPlayer) {
    currentPlayer = secondPlayer;
    opposingPlayer = firstPlayer;
  } else {
    currentPlayer = firstPlayer;
    opposingPlayer = secondPlayer;
  }
  currentPlayer.active();
  opposingPlayer.inactive();
  hold = false;
  btnHold.classList.remove("btn-active");
}

/**
 * @returns {number} min 1 max 6
 */
async function rolldice() {
  await sleep(300); //for animation

  const dice = Math.floor(Math.random() * 6 + 1);
  imgDice.src = `/images/dice-${dice}.png`;
  return dice;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
