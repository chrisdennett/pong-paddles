export class DataPaddle {
  constructor(params) {
    this.params = params;
    this.width = params.width;
    this.speed = params.speed;
    this.height = params.height;
    this.colour = params.colour;
    this.isLeft = params.type === "left";
    this.x = this.isLeft
      ? params.bounds.left
      : params.bounds.right - params.width;
    this.bounds = {
      top: params.bounds.top,
      bottom: params.bounds.bottom - params.height,
    };
    this.reset();
  }

  reset() {
    this.y = this.params.bounds.bottom / 2;
  }

  moveUp() {
    this.y -= this.speed;
    this.restrictToBounds();
  }

  moveDown() {
    this.y += this.speed;
    this.restrictToBounds();
  }

  followBall(ball) {
    const paddleIsBelowBall = this.y >= ball.y;
    const paddleIsAboveBall = this.y + this.height < ball.y;
    const ballGoingLeft = ball.vx < 0;

    // slow speed if not returning
    let isReturning =
      (this.isLeft && ballGoingLeft) || (!this.isLeft && !ballGoingLeft);

    const moveSpeed = isReturning ? this.speed : Math.random() * 2;

    if (paddleIsBelowBall) {
      this.y -= moveSpeed;
    } else if (paddleIsAboveBall) {
      this.y += moveSpeed;
    } else {
      // set target as middle of paddle
      const targY = this.y + this.height / 2;
      const dist = ball.y - targY;
      this.y += dist;
    }

    this.restrictToBounds();
  }

  restrictToBounds() {
    if (this.y < this.bounds.top) {
      this.y = this.bounds.top;
    }

    if (this.y > this.bounds.bottom) {
      this.y = this.bounds.bottom;
    }
  }
}
