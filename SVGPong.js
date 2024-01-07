import { Paddle } from "./Paddle.js";
import { Ball } from "/Ball.js";

export class SVGPong {
  constructor(dataPong) {
    this.bounds = dataPong.bounds;
    this.svg = document.getElementById("svgPong");
    this.svg.style.width = `${dataPong.displayWidth}px`;

    // game elements
    this.ballElem = document.getElementById("svgBall");
    this.leftPaddle = document.getElementById("paddleLeft");
    this.rightPaddle = document.getElementById("paddleRight");

    // score text
    this.scoreLeft = document.getElementById("scoreLeft");
    this.scoreRight = document.getElementById("scoreRight");

    this.ballElem.style.fill = dataPong.ball.colour;

    this.leftPaddle.style.fill = dataPong.paddleLeft.colour;
    this.rightPaddle.style.fill = dataPong.paddleRight.colour;
  }

  draw(dataPong) {
    this.positionElement(this.ballElem, dataPong.ball.x, dataPong.ball.y);
    this.positionElement(
      this.leftPaddle,
      dataPong.paddleLeft.x,
      dataPong.paddleLeft.y
    );
    this.positionElement(
      this.rightPaddle,
      dataPong.paddleRight.x,
      dataPong.paddleRight.y
    );

    this.scoreLeft.innerHTML = dataPong.score.p1;
    this.scoreRight.innerHTML = dataPong.score.p2;
  }

  positionElement(element, x, y) {
    element.style.transform = `translate(${x}px, ${y}px)`;
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
