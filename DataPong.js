import { DataBall } from "./DataBall.js";
import { DataPaddle } from "./DataPaddle.js";

export class DataPong {
  constructor(params) {
    const { bounds, paddle, ball } = params;
    this.bounds = bounds;
    this.score = { p1: 0, p2: 0 };
    this.params = params;
    this.ball = new DataBall({ bounds, ...ball });
    this.paddleLeft = new DataPaddle({ bounds, ...paddle, type: "left" });
    this.paddleRight = new DataPaddle({ bounds, ...paddle, type: "right" });

    this.state = "demo";
  }

  serve(toLeft) {
    this.ball.serve(toLeft);
  }

  update() {
    this.ball.update();

    if (this.state === "demo") {
      this.paddleLeft.followBall(this.ball);
      this.paddleRight.followBall(this.ball);
    }

    this.checkPointScored();
  }

  checkPointScored() {
    if (this.ball.x <= this.paddleLeft.x + this.paddleLeft.width) {
      const leftPaddleContact =
        this.ball.y + this.ball.height >= this.paddleLeft.y &&
        this.ball.y <= this.paddleLeft.y + this.paddleLeft.height;

      if (!leftPaddleContact) {
        console.log("p2 scores");
      }
    } else if (this.ball.x + this.ball.width >= this.paddleRight.x) {
      const rightPaddleContact =
        this.ball.y + this.ball.height >= this.paddleRight.y &&
        this.ball.y <= this.paddleRight.y + this.paddleRight.height;

      if (!rightPaddleContact) {
        console.log("p1 scores!");
      }
    }
  }
}
