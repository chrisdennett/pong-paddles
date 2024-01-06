export class DataBall {
  constructor(params) {
    this.params = params;
    this.colour = params.colour;
    this.bounds = params.bounds;
    this.width = this.params.width;
    this.height = this.params.height;
    // sets this.  x, y, vx, vy
    this.reset();
  }

  update() {
    this.x += this.vx;
    this.x += this.vx;
    this.y += this.vy;
    this.restictToBounds();
  }

  center() {
    this.x = this.bounds.right / 2 - this.width / 2;
    this.y = this.bounds.bottom / 2 - this.height / 2;
  }

  reset() {
    this.center();
    this.vx = 0;
    this.vy = 0;
  }

  serve(toLeft) {
    this.vx = toLeft ? -this.params.vx : this.params.vx;
    // random angle from zero up to vy set in params
    this.vy = Math.random() * this.params.vy;
  }

  restictToBounds() {
    if (this.x >= this.bounds.right - this.width) {
      this.x = this.bounds.right - this.width;
      this.vx = -this.vx;
    }

    if (this.x < this.bounds.left) {
      this.x = this.bounds.left;
      this.vx = -this.vx;
    }

    if (this.y >= this.bounds.bottom - this.height) {
      this.y = this.bounds.bottom - this.height;
      this.vy = -this.vy;
    }

    if (this.y < this.bounds.top) {
      this.y = this.bounds.top;
      this.vy = -this.vy;
    }
  }
}
