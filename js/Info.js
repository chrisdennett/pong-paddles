export class Info {
  constructor(dataPong, parentElem) {
    this.dataPong = dataPong;
    this.parentElem = parentElem;

    this.ballX = this.addInfo("ball.x");
    this.ballY = this.addInfo("ball.y");
    this.ballSpeedX = this.addInfo("ball.speed.x");
    this.ballSpeedY = this.addInfo("ball.speed.y");
    this.paddleLeftY = this.addInfo("paddle.left.y");
    this.paddleRightY = this.addInfo("paddle.right.y");
    this.winningScore = this.addInfo("score-to-win");
    this.playerOneScore = this.addInfo("player-one.score");
    this.playerTwoScore = this.addInfo("player-two.score");
    this.gameState = this.addInfo("game.state");
    this.gameMode = this.addInfo("game.mode");
    this.winner = this.addInfo("winner");
    this.showSides = this.addInfo("display.show-sides");
  }

  addInfo(name) {
    const div = document.createElement("div");
    const label = document.createElement("div");
    const span = document.createElement("div");
    label.innerHTML = `${name}: `;
    div.appendChild(label);
    div.appendChild(span);

    div.style.display = "flex";
    label.style.width = "320px";

    this.parentElem.appendChild(div);
    return span;
  }

  update() {
    this.ballX.innerHTML = this.dataPong.ball.x;
    this.ballY.innerHTML = this.dataPong.ball.y;
    this.ballSpeedX.innerHTML = this.dataPong.ball.vx;
    this.ballSpeedY.innerHTML = this.dataPong.ball.vy;

    this.paddleLeftY.innerHTML = this.dataPong.paddleLeft.y;
    this.paddleRightY.innerHTML = this.dataPong.paddleRight.y;

    this.winningScore.innerHTML = this.dataPong.winningScore;
    this.playerOneScore.innerHTML = this.dataPong.score.p1;
    this.playerTwoScore.innerHTML = this.dataPong.score.p2;

    this.gameState.innerHTML = this.dataPong.gameState;
    this.gameMode.innerHTML = this.dataPong.gameMode;

    this.winner.innerHTML = this.dataPong.winner;
    this.showSides.innerHTML = this.dataPong.showSides;
  }
}
