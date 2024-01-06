export class Info {
  constructor(dataPong, parentElem) {
    this.dataPong = dataPong;
    this.parentElem = parentElem;

    this.ballX = this.addInfo("ball x");
    this.ballY = this.addInfo("ball y");
    this.ballSpeedX = this.addInfo("ball speed x");
    this.ballSpeedY = this.addInfo("ball speed y");
  }

  addInfo(name) {
    const p = document.createElement("p");
    const span = document.createElement("span");
    p.innerHTML = `${name}: `;
    p.appendChild(span);

    this.parentElem.appendChild(p);
    return span;
  }

  update() {
    this.ballX.innerHTML = this.dataPong.ball.x;
    this.ballY.innerHTML = this.dataPong.ball.y;
    this.ballSpeedX.innerHTML = this.dataPong.ball.vx;
    this.ballSpeedY.innerHTML = this.dataPong.ball.vy;
    // this.ballDirElem.innerHTML = this.ball.vx < 0 ? "left" : "right";
    // this.ballSpeedXElem.innerHTML = this.ball.vx;
    // this.ballSpeedYElem.innerHTML = this.ball.vy;
  }
}
