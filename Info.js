export class Info {
  constructor(dataPong, parentElem) {
    this.dataPong = dataPong;
    this.parentElem = parentElem;

    this.ballX = this.addInfo("Ball x");
    this.ballY = this.addInfo("Ball y");
    this.ballSpeedX = this.addInfo("Ball speed x");
    this.ballSpeedY = this.addInfo("Ball speed y");
    this.paddleLeftY = this.addInfo("Left paddle y");
    this.paddleRightY = this.addInfo("Right paddle y");
    this.winningScore = this.addInfo("Score to win");
    this.playerOneScore = this.addInfo("Player one score");
    this.playerTwoScore = this.addInfo("Player two score");
    this.gameState = this.addInfo("Game State");
    this.gameMode = this.addInfo("Game Mode");
    this.winner = this.addInfo("Winner");
  }

  addInfo(name) {
    const p = document.createElement("p");
    const span = document.createElement("span");
    p.innerHTML = `${name}: `;
    p.appendChild(span);

    this.parentElem.appendChild(p);
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
  }
}
