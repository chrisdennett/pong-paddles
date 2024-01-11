import { DataBall } from "./DataBall.js";
import { DataInputs } from "./DataInputs.js";
import { DataPaddle } from "./DataPaddle.js";

export class DataPong {
  constructor(params) {
    const { bounds, paddle, ball, winningScore, gameMode } = params;
    this.params = params;
    this.winningScore = winningScore; // set here for convenience
    // demo, onePlayer, twoPlayer,
    // demoDoubles, onePlayerDoubles, twoPlayerDoubles
    this.gameMode = gameMode;
    this.gameState = "playing"; // "playing", "gameOver", "menu"
    this.winner = "";
    this.score = { p1: 0, p2: 0 };
    this.ball = new DataBall({ bounds, ...ball });
    this.paddleLeft = new DataPaddle({ bounds, ...paddle, type: "left" });
    this.paddleRight = new DataPaddle({ bounds, ...paddle, type: "right" });
    if (this.gameMode === "onePlayer") {
      this.paddleRight.speed = paddle.computerSpeed;
      console.log("this.paddleRight.speed: ", this.paddleRight.speed);
    }
    this.dataInputs = new DataInputs({});
    this.serveLeft = false;
  }

  startGame() {
    this.gameState = "playing";
    this.score = { p1: 0, p2: 0 };
    this.paddleLeft.reset();
    this.paddleRight.reset();
    this.serve();
  }

  serve() {
    this.ball.serve(this.serveLeft);
    this.serveLeft = !this.serveLeft;
  }

  update() {
    if (this.gameState !== "playing") {
      return;
    }

    this.checkPointScored();

    this.ball.update();

    if (this.gameMode === "demo") {
      this.paddleLeft.followBall(this.ball);
      this.paddleRight.followBall(this.ball);
    } else if (this.gameMode === "onePlayer") {
      this.dataInputs.update();
      if (this.dataInputs.playerOne.up) {
        this.paddleLeft.moveUp();
      } else if (this.dataInputs.playerOne.down) {
        this.paddleLeft.moveDown();
      }
      this.paddleRight.followBall(this.ball);
    }
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
    // game over - start new game after a delay
    if (gameOver) {
      setTimeout(() => {
        this.startGame();
      }, this.params.delayRestartAfterWin);
    }
    // point over serve after a delay
    else {
      setTimeout(() => {
        this.serve();
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

      if (leftPaddleContact) {
        this.ball.return();
      } else {
        // missed by left paddle (player one)
        this.onPointScored(false);
      }
    } else if (this.ball.x + this.ball.width >= this.paddleRight.x) {
      const rightPaddleContact =
        this.ball.y + this.ball.height >= this.paddleRight.y &&
        this.ball.y <= this.paddleRight.y + this.paddleRight.height;

      if (rightPaddleContact) {
        this.ball.return();
      } else {
        // missed by right paddle (player two)
        this.onPointScored(true);
      }
    }
  }
}
