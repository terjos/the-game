import "./css/style.css";
import Player from "./js/player";

const WIN_SCORE = 100;

const btnNewGame = document.getElementById("btnNewGame");
const btnRolldice = document.getElementById("btnRolldice");
const btnHold = document.getElementById("btnHold");
const elDice = document.getElementById("dice");

const firstPlayer = new Player("firstPlayer");
const secondPlayer = new Player("secondPlayer");

let hold = false;
let currentPlayer = firstPlayer;
let opposingPlayer = secondPlayer;

currentPlayer.active();

btnNewGame.addEventListener("click", handlebtnNewGame);
btnRolldice.addEventListener("click", handleBtnRolldice);
btnHold.addEventListener("click", handleBtnHold);

function handlebtnNewGame() {
  btnHold.disabled = false;
  btnRolldice.disabled = false;
  elDice.classList.remove("dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6");
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
      btnRolldice.disabled = false;
      if (currentPlayer.score >= WIN_SCORE) {
        currentPlayer.win();
        opposingPlayer.lose();
        btnRolldice.disabled = true;
        btnHold.disabled = true;
      }
    }
    exchangePlayer();
  } else {
    currentPlayer.roundScore = dice + currentPlayer.roundScore;
    btnRolldice.disabled = false;
  }
}

function handleBtnHold() {
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
  const dice = Math.floor(Math.random() * 6 + 1);
  elDice.classList.remove("dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6");

  return new Promise((resolve) => {
    elDice.classList.add(`spin-dice-${dice}`, `dice-${dice}`);
    setTimeout(() => {
      elDice.classList.remove(`spin-dice-${dice}`);
      return resolve(dice);
    }, 2100);
  });
}
