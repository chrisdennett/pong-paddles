import { DataBall } from "./DataBall.js";
import { DataPaddle } from "./DataPaddle.js";

export class DataPong {
  constructor(params) {
    const { bounds, paddle, ball, winningScore } = params;
    this.params = params;
    this.winningScore = winningScore; // set here for convenience
    this.gameMode = "demo";
    this.gameState = "playing"; // "playing", "gameOver", "menu"
    this.winner = "";
    this.score = { p1: 0, p2: 0 };
    this.ball = new DataBall({ bounds, ...ball });
    this.paddleLeft = new DataPaddle({ bounds, ...paddle, type: "left" });
    this.paddleRight = new DataPaddle({ bounds, ...paddle, type: "right" });
  }

  startGame() {
    const serveLeft = Math.random() < 0.5;
    this.serve(serveLeft);
  }

  serve(toLeft) {
    this.ball.serve(toLeft);
  }

  update() {
    this.ball.update();

    if (this.gameMode === "demo") {
      this.paddleLeft.followBall(this.ball);
      this.paddleRight.followBall(this.ball);
    }

    this.checkPointScored();
  }

  onPointScored(byPlayerOne) {
    // put ball back to center spot
    this.ball.reset();

    // increase the relevant score
    if (byPlayerOne) {
      this.score.p1++;
    } else {
      this.score.p2++;
    }

    const gameOver = this.checkForWinner();

    if (!gameOver) {
      // start serve
      setTimeout(() => {
        this.ball.serve(!byPlayerOne);
      }, this.params.delayAfterPoint);
    }
  }

  checkForWinner() {
    let isWinner = false;

    if (this.score.p1 === this.params.winningScore) {
      this.winner = "p1";
      isWinner = true;
    } else if (this.score.p2 === this.params.winningScore) {
      this.winner = "p2";
      isWinner = true;
    }

    this.gameState = isWinner ? "gameOver" : "playing";

    // if winner show

    return isWinner;
  }

  checkPointScored() {
    if (this.ball.x <= this.paddleLeft.x + this.paddleLeft.width) {
      const leftPaddleContact =
        this.ball.y + this.ball.height >= this.paddleLeft.y &&
        this.ball.y <= this.paddleLeft.y + this.paddleLeft.height;

      if (!leftPaddleContact) {
        // missed by left paddle (player one)
        this.onPointScored(false);
      }
    } else if (this.ball.x + this.ball.width >= this.paddleRight.x) {
      const rightPaddleContact =
        this.ball.y + this.ball.height >= this.paddleRight.y &&
        this.ball.y <= this.paddleRight.y + this.paddleRight.height;

      if (!rightPaddleContact) {
        // missed by right paddle (player two)
        this.onPointScored(true);
      }
    }
  }
}
