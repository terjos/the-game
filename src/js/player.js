class Player {
  constructor(id) {
    this._container = document.getElementById(id);
    this._score = document.getElementById(`${id}Score`);
    this._status = document.getElementById(`${id}Status`);
    this._roundScore = document.getElementById(`${id}RoundScore`);
    this._state = { score: 0, roundScore: 0 };
  }

  init() {
    this._container.classList.remove("player-end-game");
    this._state = { score: 0, roundScore: 0 };
    this._roundScore.innerHTML = 0;
    this._score.innerHTML = 0;
  }

  win() {
    this._status.innerHTML = "YOU WIN";
    this._container.classList.add("player-end-game");
  }

  lose() {
    this._status.innerHTML = "YOU LOSE";
    this._container.classList.add("player-end-game");
  }

  active() {
    this._container.classList.add("player-active");
  }

  inactive() {
    this._container.classList.remove("player-active");
  }

  get score() {
    return this._state.score;
  }

  set score(value) {
    this._state.score = this._state.score + value;
    this._score.innerHTML = this._state.score;
    this._state.roundScore = 0;
    this._roundScore.innerHTML = 0;
  }

  get roundScore() {
    return this._state.roundScore;
  }

  set roundScore(value) {
    this._state.roundScore = value;
    this._roundScore.innerHTML = this._state.roundScore;
  }
}

export default Player;
