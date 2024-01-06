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
    this.y = 20;
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
      this.y += Math.random() * 2;
    }

    this.restrictToBounds();
  }

  restrictToBounds() {
    if (this.y < 0) {
      this.y = 0;
    }

    if (this.y > this.bounds.bottom) {
      this.y = this.bounds.bottom;
    }
  }
}
