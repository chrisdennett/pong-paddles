import { Paddle } from "./Paddle.js";
import { Ball } from "/Ball.js";

export class SVGPong {
  constructor(params) {
    this.bounds = params.bounds;
    this.svg = document.getElementById("svgPong");

    this.ballElem = document.getElementById("svgBall");
    const paddleLeftElem = document.getElementById("paddleLeft");
    const paddleRightElem = document.getElementById("paddleRight");

    // ballElem.style.transform = `translate(${this.ballParams.right}px, ${this.ballParams.top}px)`;
    this.ballElem.style.fill = `#ff0000`;

    // paddleLeftElem.style.transform = `translate(${this.gameBounds.left}px, ${this.gameBounds.top}px)`;
    // paddleLeftElem.style.fill = `#ff0000`;

    // paddleRightElem.style.transform = `translate(${this.paddleParams.right}px, ${this.paddleParams.bottom}px)`;
    // paddleRightElem.style.fill = `#ff0000`;

    this.svg.style.width = `${this.bounds.right}px`;
    this.svg.style.height = `${this.bounds.bottom}px`;

    // this.ball = new Ball(this.svg, params);
    // this.paddleLeft = new Paddle({
    //   side: "left",
    //   parentElement: this.svg,
    //   ball: this.ball,
    //   params,
    // });
    // this.paddleRight = new Paddle({
    //   side: "right",
    //   parentElement: this.svg,
    //   ball: this.ball,
    //   params,
    // });
  }

  draw(dataPong) {
    this.ballElem.style.transform = `translate(${dataPong.ball.x}px, ${dataPong.ball.y}px)`;
  }

  // onPointScored(wonBy) {
  //   // this.lastScoreOneBy = wonBy;
  //   // this.ball.reset();
  //   // setTimeout(() => {
  //   //   console.log("wonBy: ", wonBy);
  //   //   this.ball.vy = Math.random() >= 0.5 ? 9 : -9;
  //   //   const serveToPlayerOne = this.lastScoreOneBy === "p2";
  //   //   this.ball.serve(serveToPlayerOne);
  //   // }, 500);
  // }

  // update() {
  //   this.ball.update();
  //   this.paddleLeft.update();
  //   this.paddleRight.update();
  //   this.info.update();

  //   const paddleLeftHit = this.checkPaddleLeftHit();
  //   const paddleRightHit = this.checkPaddleRightHit();

  //   if (paddleLeftHit === "hit") {
  //     // play noise
  //     // bounce ball
  //     this.ball.vx = -this.ball.vx;
  //   } else if (paddleLeftHit === "miss") {
  //     this.score.p2++;
  //     this.player2Score.innerHTML = this.score.p2;
  //     this.onPointScored("p2");
  //   }

  //   if (paddleRightHit === "hit") {
  //     // play noise
  //     // bounce ball
  //     this.ball.vx = -this.ball.vx;
  //   } else if (paddleRightHit === "miss") {
  //     this.score.p1++;
  //     this.player1Score.innerHTML = this.score.p1;
  //     this.onPointScored("p1");
  //   }
  // }

  // checkPaddleLeftHit() {
  //   const travellingLeft = this.ball.vx < 0;
  //   const isFarEnoughLeft = this.ball.x <= this.paddleLeft.width;
  //   if (!travellingLeft || !isFarEnoughLeft) return null;

  //   return this.paddleHit(this.paddleLeft);
  // }

  // checkPaddleRightHit() {
  //   const travellingRight = this.ball.vx > 0;
  //   const isFarEnoughRight =
  //     this.ball.x + this.ball.width >= this.paddleRight.x;
  //   if (!travellingRight || !isFarEnoughRight) return null;

  //   return this.paddleHit(this.paddleRight);
  // }

  // paddleHit(paddle) {
  //   const belowPaddleTop = this.ball.y + this.ball.height > paddle.y;
  //   const abovePaddleBottom = this.ball.y < paddle.y + paddle.height;

  //   if (belowPaddleTop && abovePaddleBottom) {
  //     return "hit";
  //   } else {
  //     return "miss";
  //   }
  // }
}

class SVGBall {
  constructor() {}
}
