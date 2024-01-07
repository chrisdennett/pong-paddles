import { DataBall } from "./DataBall.js";
import { DataPaddle } from "./DataPaddle.js";

export class DataPong {
  constructor(params) {
    const { bounds, paddle, ball } = params;
    this.bounds = bounds;
    this.score = params.score;
    this.params = params;
    this.ball = new DataBall({ bounds, ...ball });
    this.paddleLeft = new DataPaddle({ bounds, ...paddle, type: "left" });
    this.paddleRight = new DataPaddle({ bounds, ...paddle, type: "right" });
  }

  serve(toLeft) {
    this.ball.serve(toLeft);
  }

  update() {
    this.ball.update();

    if (this.params.gameMode === "demo") {
      this.paddleLeft.followBall(this.ball);
      this.paddleRight.followBall(this.ball);
    }

    this.checkPointScored();
  }

  onPointScored(byPlayerOne) {
    this.ball.reset();

    if (byPlayerOne) {
      this.params.score.p1++;
    } else {
      this.params.score.p2++;
    }

    setTimeout(() => {
      this.ball.serve(!byPlayerOne);
    }, this.params.delayAfterPoint);
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
