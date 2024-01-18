export class SVGPong {
  constructor(dataPong) {
    this.dataPong = dataPong;
    this.bounds = dataPong.bounds;
    this.svg = document.getElementById("svgPong");
    this.svg.style.width = `${dataPong.displayWidth}px`;

    // game elements
    this.ballElem = document.getElementById("svgBall");
    this.leftPaddle = document.getElementById("paddleLeft");
    this.rightPaddle = document.getElementById("paddleRight");
    this.netMiddle = document.getElementById("netMiddle");

    // score text
    this.scoreLeft = document.getElementById("scoreLeft");
    this.scoreRight = document.getElementById("scoreRight");

    // game over content
    this.gameOverContent = document.getElementById("gameOverContent");
    this.gameOverWinnerText = document.getElementById("gameOverWinnerText");
    this.gameOverContent.style.display = "none";

    this.ballElem.style.fill = dataPong.ball.colour;

    this.leftPaddle.style.fill = dataPong.paddleLeft.colour;
    this.rightPaddle.style.fill = dataPong.paddleRight.colour;
  }

  showGameOverScreen() {
    this.netMiddle.style.display = "none";
    this.gameOverContent.style.display = "inherit";

    const playerTwoWon = this.dataPong.winner === "p2";
    const winText = `PLAYER ${playerTwoWon ? "TWO" : "ONE"} WINS`;

    gameOverWinnerText.innerHTML = winText;
  }

  hideGameOverScreen() {
    this.netMiddle.style.display = "inherit";
    this.gameOverContent.style.display = "none";
  }

  draw() {
    this.ballElem.style.fill = this.dataPong.ball.colour;

    if (this.dataPong.gameState === "gameOver") {
      this.showGameOverScreen();
    } else {
      this.hideGameOverScreen();
    }

    if (this.dataPong.gameState === "playing") {
      this.positionElement(
        this.ballElem,
        this.dataPong.ball.x,
        this.dataPong.ball.y
      );
      this.positionElement(
        this.leftPaddle,
        this.dataPong.paddleLeft.x,
        this.dataPong.paddleLeft.y
      );
      this.positionElement(
        this.rightPaddle,
        this.dataPong.paddleRight.x,
        this.dataPong.paddleRight.y
      );
    }

    this.scoreLeft.innerHTML = this.dataPong.score.p1;
    this.scoreRight.innerHTML = this.dataPong.score.p2;
  }

  positionElement(element, x, y) {
    element.style.transform = `translate(${x}px, ${y}px)`;
  }
}
