import { DataBall } from "./DataBall.js";
import { DataPaddle } from "./DataPaddle.js";

export class DataPong {
  constructor(params) {
    const { bounds, paddle, ball } = params;
    this.bounds = bounds;
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
  }
}
