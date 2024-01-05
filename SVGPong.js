import { Info } from "./Info.js";
import { Paddle } from "./Paddle.js";
import { Ball } from "/Ball.js";

export class SVGPong {
  constructor(params) {
    this.bounds = params.bounds;
    this.middleX = this.bounds.right / 2;
    this.gameBounds = params.gameBounds;
    this.paddleParams = params.paddle;
    this.ballParams = params.ball;

    this.paddleParams.left = this.gameBounds.left;
    this.paddleParams.top = this.gameBounds.top;
    this.paddleParams.bottom =
      this.gameBounds.bottom - this.paddleParams.height;
    this.paddleParams.right = this.gameBounds.right - this.paddleParams.width;

    this.ballParams.left = this.gameBounds.left;
    this.ballParams.top = this.gameBounds.top;
    this.ballParams.right = this.gameBounds.right - this.ballParams.width;
    this.ballParams.bottom = this.gameBounds.bottom - this.ballParams.height;

    this.svg = document.getElementById("svgPong");

    const ballElem = document.getElementById("svgBall");
    const paddleLeftElem = document.getElementById("paddleLeft");
    const paddleRightElem = document.getElementById("paddleRight");

    ballElem.style.transform = `translate(${this.ballParams.right}px, ${this.ballParams.top}px)`;
    ballElem.style.fill = `#ff0000`;

    paddleLeftElem.style.transform = `translate(${this.gameBounds.left}px, ${this.gameBounds.top}px)`;
    paddleLeftElem.style.fill = `#ff0000`;

    paddleRightElem.style.transform = `translate(${this.paddleParams.right}px, ${this.paddleParams.bottom}px)`;
    paddleRightElem.style.fill = `#ff0000`;

    this.svg.style.width = `${this.bounds.right}px`;
    this.svg.style.height = `${this.bounds.bottom}px`;
    this.score = { p1: 0, p2: 0 };
    this.lastScoreOneBy = null;

    this.ball = new Ball(this.svg, params);
    this.paddleLeft = new Paddle({
      side: "left",
      parentElement: this.svg,
      ball: this.ball,
      params,
    });
    this.paddleRight = new Paddle({
      side: "right",
      parentElement: this.svg,
      ball: this.ball,
      params,
    });
    this.info = new Info(this.ball);
  }

  onPointScored(wonBy) {
    // this.lastScoreOneBy = wonBy;
    // this.ball.reset();
    // setTimeout(() => {
    //   console.log("wonBy: ", wonBy);
    //   this.ball.vy = Math.random() >= 0.5 ? 9 : -9;
    //   const serveToPlayerOne = this.lastScoreOneBy === "p2";
    //   this.ball.serve(serveToPlayerOne);
    // }, 500);
  }

  update() {
    this.ball.update();
    this.paddleLeft.update();
    this.paddleRight.update();
    this.info.update();

    const paddleLeftHit = this.checkPaddleLeftHit();
    const paddleRightHit = this.checkPaddleRightHit();

    if (paddleLeftHit === "hit") {
      // play noise
      // bounce ball
      this.ball.vx = -this.ball.vx;
    } else if (paddleLeftHit === "miss") {
      this.score.p2++;
      this.player2Score.innerHTML = this.score.p2;
      this.onPointScored("p2");
    }

    if (paddleRightHit === "hit") {
      // play noise
      // bounce ball
      this.ball.vx = -this.ball.vx;
    } else if (paddleRightHit === "miss") {
      this.score.p1++;
      this.player1Score.innerHTML = this.score.p1;
      this.onPointScored("p1");
    }
  }

  checkPaddleLeftHit() {
    const travellingLeft = this.ball.vx < 0;
    const isFarEnoughLeft = this.ball.x <= this.paddleLeft.width;
    if (!travellingLeft || !isFarEnoughLeft) return null;

    return this.paddleHit(this.paddleLeft);
  }

  checkPaddleRightHit() {
    const travellingRight = this.ball.vx > 0;
    const isFarEnoughRight =
      this.ball.x + this.ball.width >= this.paddleRight.x;
    if (!travellingRight || !isFarEnoughRight) return null;

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
}

class SVGBall {
  constructor() {}
}
