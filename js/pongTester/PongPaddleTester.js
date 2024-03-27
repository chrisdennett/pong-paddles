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

    this.totalBalls = 5;
    this.usePongPhysics = true;

    this.svgPong = shadow.getElementById("svgPongTester");
  }

  setup(customSettings) {
    this.dataPong = new DataPong({
      ...this.defaultGameSettings,
      ...customSettings,
    });

    // create a set of data balls
    this.testBalls = [];
    const hueOffset = 360 / this.totalBalls;

    for (let i = 0; i < this.totalBalls; i++) {
      const dataBall = new DataBall({
        ...this.ballParams,
        bounds: this.dataPong.bounds,
      });
      dataBall.colour = `hsl(${hueOffset * i}, 60%, 50%)`;
      dataBall.index = i;
      this.testBalls.push(dataBall);
    }

    this.resetBalls();

    this.svgPong.setup(this.dataPong, this.testBalls);
    this.svgPong.draw();
  }

  resetBalls() {
    for (let dataBall of this.testBalls) {
      this.resetBall(dataBall);
    }
  }

  resetBall(dataBall) {
    // const midY = minY + range / 2;

    const usePos1 = false;

    const ballStartX = this.dataPong.bounds.right;
    const ballTargX =
      this.dataPong.paddleLeft.x + this.dataPong.paddleLeft.width;

    const minY = this.dataPong.paddleLeft.y - dataBall.size;
    const maxY =
      this.dataPong.paddleLeft.y +
      this.dataPong.paddleLeft.height +
      dataBall.size;

    const range = maxY - minY;

    const ballOffsetAmount = range / this.totalBalls;
    const ballOffset = dataBall.index * ballOffsetAmount;
    const ballTargY = minY + ballOffset;

    let ballStartY;

    // spread over range
    if (usePos1) {
      ballStartY = ballTargY;
    } else {
      ballStartY = this.dataPong.bounds.bottom - 30 + ballOffset;
    }

    dataBall.manuallySetBallPos(ballStartX, ballStartY);

    const targ = {
      x: ballTargX,
      y: ballTargY,
    };

    dataBall.aimBallAtTarget(targ, false);
  }

  loop() {
    const p = this.dataPong.paddleLeft;
    // const b = this.testBalls[0];
    for (let b of this.testBalls) {
      b.update();
      const inHitZone = this.dataPong.checkIfBallIsInPaddleHitZone(p, b);

      if (inHitZone) {
        const contactData = this.dataPong.checkPaddleContact(p, b);
        if (contactData.contact) {
          b.return(contactData.offset, this.usePongPhysics);
        }
      }

      // if goes off the right side reset ball
      if (b.x > this.dataPong.bounds.right) {
        this.resetBall(b);
      }

      // if goes off the left side reset ball
      if (b.x < this.dataPong.bounds.left) {
        this.resetBall(b);
      }
    }

    this.svgPong.draw();
  }
}

customElements.define("pong-paddle-tester", PongPaddleTester);
