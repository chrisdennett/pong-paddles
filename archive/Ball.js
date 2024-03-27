export class Ball {
  constructor(parentElement, params) {
    this.defaultParams = params.ball;
    this.div = document.createElement("div");
    this.div.classList = ["ball"];
    parentElement.appendChild(this.div);
    this.bounds = params.bounds;
    this.x = 100;
    this.y = 200;
    this.vx = this.defaultParams.vx;
    this.vy = this.defaultParams.vx;
    this.height = 20;
    this.width = 20;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.restrictToBounds();

    this.draw();
  }

  draw() {
    this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  center() {
    this.x = this.bounds.right / 2 - this.width / 2;
    this.y = this.bounds.bottom / 2 - this.height / 2;
  }

  reset() {
    this.center();
    this.vx = 0;
    this.vy = 0;
    this.draw();
  }

  serve(toPlayerOne) {
    this.vx = toPlayerOne ? -this.defaultParams.vx : this.defaultParams.vx;
    this.vy = Math.random() * this.defaultParams.vy;
    this.draw();
  }

  restrictToBounds() {
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
