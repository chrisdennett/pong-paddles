import { Info } from "./Info.js";
import { Paddle } from "./Paddle.js";
import { Ball } from "/Ball.js";

export class Pong {
  constructor(bounds, parentElement) {
    this.bounds = bounds;
    this.div = document.createElement("div");
    this.div.classList = ["playArea"];
    parentElement.appendChild(this.div);
    this.addNet();
    this.ball = new Ball(this.bounds, this.div);
    this.paddleLeft = new Paddle({
      parentElement: this.div,
      bounds,
      ball: this.ball,
      side: "left",
    });
    this.paddleRight = new Paddle({
      parentElement: this.div,
      bounds,
      ball: this.ball,
      side: "right",
    });
    this.info = new Info(this.ball);
  }

  addNet() {
    this.net = document.createElement("div");
    this.net.classList = ["net"];
    // this.net.style.width =  + "px";
    this.net.style.left = this.bounds.right / 2 + "px";
    this.div.appendChild(this.net);
  }

  update() {
    this.ball.update();
    this.paddleLeft.update();
    this.paddleRight.update();
    this.info.update();

    // travelling from right to left

    const paddleLeftHit = this.checkPaddleLeftHit();
    const paddleRightHit = this.checkPaddleRightHit();

    if (paddleLeftHit === "hit") {
      // play noise
      // bounce ball
      this.ball.vx = -this.ball.vx;
      console.log("paddleLeftHit: ", paddleLeftHit);
    } else if (paddleLeftHit === "miss") {
      console.log("paddleLeftHit: ", paddleLeftHit);
    }

    if (paddleRightHit === "hit") {
      // play noise
      // bounce ball
      this.ball.vx = -this.ball.vx;
      console.log("paddleRightHit: ", paddleRightHit);
    } else if (paddleRightHit === "miss") {
      console.log("paddleRightHit: ", paddleRightHit);
    }
  }

  checkPaddleLeftHit() {
    const travellingLeft = this.ball.vx < 0;
    const isFarEnoughLeft = this.ball.x < this.paddleLeft.width;
    if (!travellingLeft || !isFarEnoughLeft) return null;

    return this.paddleHit(this.paddleRight);
  }

  paddleHit(paddle) {
    const belowPaddleTop = this.ball.y + this.ball.height > paddle.y;
    const abovePaddleBottom = this.ball.y < paddle.y + paddle.height;

    if (belowPaddleTop && abovePaddleBottom) {
      return "hit";
    } else {
      return "miss";
    }
  }

  checkPaddleRightHit() {
    const travellingRight = this.ball.vx > 0;
    const isFarEnoughRight =
      this.ball.x >= this.paddleRight.x - this.paddleRight.width;
    if (!travellingRight || !isFarEnoughRight) return null;

    return this.paddleHit(this.paddleRight);
  }
}
