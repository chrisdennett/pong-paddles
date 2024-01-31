import { DataPong } from "./js/dataPong/DataPong.js";
import { Info } from "./js/Info.js";
import { calculateFPS } from "./js/fps.js";

const infoListElem = document.getElementById("infoList");

const pongData = {
  gameMode: "demo",
  displayWidth: 800,
  delayAfterPoint: 1000,
  delayRestartAfterWin: 2000,
  winningScore: 11,
  useGapBug: false,
  useScoreBasedPaddleSizes: false,
  palette: {
    surround: "yellow",
    inset: "blue",
    screen: "red",
    paddleLeft: "white",
    paddleRight: "white",
    ball: "white",
    net: "white",
    boundaryLeft: "white",
    boundaryRight: "white",
    boundaryTop: "white",
    boundaryBottom: "white",
    scoreLeft: "white",
    scoreRight: "white",
    text: "white",
  },
  display: {
    showNet: true,
    showSides: true,
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
  ball: {
    colour: "#ffffff",
    serveVx: 3,
    serveVy: 1,
    vx: 5,
    maxVy: 3,
    size: 10,
  },
  paddle: {
    colour: "#ffffff",
    width: 5,
    height: 20,
    speed: 5,
    computerSpeed: 5,
  },
};

// const svgParams = {
//   ball: {
//     vx: 20,
//     vy: 50,
//     width: 5.3,
//     height: 5.3,
//   },
//   paddle: {
//     colour: "#f9f9f9",
//     width: 5.3,
//     height: 21.2,
//     speed: 6,
//   },
//   bounds: {
//     top: 0,
//     right: 1000,
//     bottom: 800,
//     left: 0,
//   },
//   gameBounds: {
//     top: 28.2,
//     right: 240,
//     bottom: 192,
//     left: 37,
//   },
//   winningScore: 11,
// };
// const params = {
//   ball: {
//     vx: 20,
//     vy: 50,
//   },
//   paddle: {
//     width: 20,
//     height: 60,
//     speed: 6,
//   },
//   bounds: {
//     top: 0,
//     right: 500,
//     bottom: 400,
//     left: 0,
//   },
//   winningScore: 11,
// };
// const parentElement = document.getElementById("main");

// const testArea = new PongTestArea(bounds, parentElement);
// const pong = new Pong(params, parentElement);
const dataPong = new DataPong(pongData);
const dataPong2 = new DataPong(pongData);
const info = new Info(dataPong, infoListElem);

const pong1 = document.getElementById("pong1");
const pong2 = document.getElementById("pong2");
pong1.setup(dataPong);
pong2.setup(dataPong2);

dataPong.startGame();
dataPong2.startGame();

loop();

function loop() {
  // pong.update();
  //  testArea.update();
  dataPong.update();
  dataPong2.update();
  info.update();
  pong1.draw();
  pong2.draw();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
