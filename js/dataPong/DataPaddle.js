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

  getDistanceToBallAsFraction(ball) {
    let distanceToBall = 0;
    if (this.isLeft) {
      distanceToBall = ball.x - this.params.bounds.left;
    } else {
      distanceToBall = this.params.bounds.right - ball.x;
    }

    distanceToBall -= this.width;
    const maxDistance = this.params.bounds.right - this.params.bounds.left;

    return 1 - distanceToBall / maxDistance;
  }

  followBall(ball) {
    const distToBall = this.getDistanceToBallAsFraction(ball);

    const paddleIsBelowBall = this.y > ball.y;
    const paddleIsAboveBall = this.y + this.height <= ball.y;
    const ballGoingLeft = ball.vx < 0;
    let isReturning =
      (this.isLeft && ballGoingLeft) || (!this.isLeft && !ballGoingLeft);

    // set based on proximaty
    const maxSpeed = isReturning ? this.speed : this.speed / 4;
    const computerSpeed = distToBall * maxSpeed;

    if (paddleIsBelowBall) {
      this.y -= computerSpeed;
    } else if (paddleIsAboveBall) {
      this.y += computerSpeed;
    } else {
      // set target as middle of paddle
      const targY = this.y + this.height / 2;
      const dist = ball.y - targY;

      this.y += dist <= computerSpeed ? dist : computerSpeed;
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
