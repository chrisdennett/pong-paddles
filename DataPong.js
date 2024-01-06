import { PongBall } from "./PongBall.js";

export class DataPong {
  constructor(params) {
    this.params = params;
    this.ball = new PongBall({ bounds: params.bounds, ...this.params.ball });
  }

  serve(toLeft) {
    this.ball.serve(toLeft);
  }

  update() {
    this.ball.update();
  }
}
