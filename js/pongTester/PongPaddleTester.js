import { DataBall } from "../pong/dataPong/DataBall.js";
import { DataPong } from "../pong/dataPong/DataPong.js";

const PongPaddleTesterTemplate = document.createElement("template");
PongPaddleTesterTemplate.innerHTML = /*html*/ `
    <style></style>
    <svg-pong-tester id="svgPongTester">
      
    </svg-pong-tester>
`;

class PongPaddleTester extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(PongPaddleTesterTemplate.content.cloneNode(true));

    this.ballParams = {
      serveVx: 3,
      serveVy: 1,
      vx: 5,
      maxVy: 3,
      size: 5,
    };

    this.defaultGameSettings = {
      gameMode: "demo",
      displayWidth: 800,
      delayAfterPoint: 1000,
      delayRestartAfterWin: 2000,
      winningScore: 11,
      useGapBug: false,
      useScoreBasedPaddleSizes: false,
      palette: {
        surround: "#3584fb",
        inset: "#3783fa",
        screen: "#3584fb",
        paddleLeft: "white",
        paddleRight: "white",
        ball: "white",
        net: "white",
        boundaryLeft: "white",
        boundaryRight: "white",
        boundaryTop: "white",
        boundaryBottom: "white",
        scoreLeft: "purple",
        scoreRight: "yellow",
        text: "white",
      },
      display: {
        showSides: false,
        showNet: true,
        useGooeyFilter: true,
        useTvFilter: true,
        fullCabinet: false,
      },
      bounds: {
        top: 28.2,
        right: 240,
        bottom: 192,
        left: 37,
      },
      ball: this.ballParams,
      paddle: {
        width: 5,
        height: 20,
        speed: 5,
        computerSpeed: 5,
      },
    };

    this.svgPong = shadow.getElementById("svgPongTester");
  }

  setup(customSettings) {
    this.dataPong = new DataPong({
      ...this.defaultGameSettings,
      ...customSettings,
    });

    // create a set of data balls
    const totalBalls = 4;
    const testBalls = [];
    for (let i = 0; i < totalBalls; i++) {
      const dataBall = new DataBall({
        ...this.ballParams,
        bounds: this.dataPong.bounds,
      });

      dataBall.manuallySetBallPos(
        this.dataPong.bounds.right,
        this.dataPong.bounds.middleY
      );

      testBalls.push(dataBall);
    }

    // this.svgPong.setupTestBalls(testBalls);

    this.svgPong.setup(this.dataPong, testBalls);
    this.svgPong.draw();
  }

  get score() {
    return this.dataPong.score;
  }

  setPaddleOneY(y) {
    this.dataPong.paddleLeft.setY(y);
  }
  setPaddleTwoY(y) {
    this.dataPong.paddleRight.setY(y);
  }

  start() {
    this.dataPong.startGame();
    this.svgPong.draw();
  }

  loop() {
    this.dataPong.update();
    this.svgPong.draw();
  }

  //  GETTERS
  get state() {
    return this.dataPong.gameState;
  }

  get score() {
    return this.dataPong.score;
  }
}

customElements.define("pong-paddle-tester", PongPaddleTester);
