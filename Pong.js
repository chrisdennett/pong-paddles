import { Info } from "./Info.js";
import { Paddle } from "./Paddle.js";
import { Ball } from "/Ball.js";

export class Pong {
  constructor(params, parentElement) {
    this.bounds = params.bounds;
    this.middleX = this.bounds.right / 2;
    this.div = document.createElement("div");
    this.div.classList = ["playArea"];
    parentElement.appendChild(this.div);
    this.score = { p1: 0, p2: 0 };
    this.lastScoreOneBy = null;

    this.addNet();
    this.addScores();
    this.ball = new Ball(this.div, params);
    this.paddleLeft = new Paddle({
      parentElement: this.div,
      bounds: this.bounds,
      ball: this.ball,
      side: "left",
    });
    this.paddleRight = new Paddle({
      parentElement: this.div,
      bounds: this.bounds,
      ball: this.ball,
      side: "right",
    });
    this.info = new Info(this.ball);
  }

  addScores() {
    // p1
    this.player1Score = document.createElement("div");
    this.player1Score.innerHTML = this.score.p1;
    this.player1Score.classList = ["score"];
    this.player1Score.style.width = `${this.middleX}px`;
    this.div.appendChild(this.player1Score);

    // p2
    this.player2Score = document.createElement("div");
    this.player2Score.innerHTML = this.score.p2;
    this.player2Score.classList = ["score"];
    this.player2Score.style.width = `${this.middleX}px`;
    this.player2Score.style.left = `${this.middleX}px`;
    this.div.appendChild(this.player2Score);
  }

  onPointScored(wonBy) {
    this.lastScoreOneBy = wonBy;
    this.ball.reset();

    setTimeout(() => {
      console.log("wonBy: ", wonBy);
      this.ball.vy = Math.random() >= 0.5 ? 9 : -9;
      const serveToPlayerOne = this.lastScoreOneBy === "p2";
      this.ball.serve(serveToPlayerOne);
    }, 500);
  }

  addNet() {
    this.net = document.createElement("div");
    this.net.classList = ["net"];
    this.net.style.width = `20px`;
    this.net.style.left = `${this.middleX - 10}px`;
    this.div.appendChild(this.net);
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
