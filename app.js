import { DataPong } from "./js/dataPong/DataPong.js";
import { Info } from "./js/Info.js";
// import { Pong } from "./Pong.js";
import { SVGPong } from "./js/SVGPong.js";
// import { PongTestArea } from "./PongTestArea.js";
import { calculateFPS } from "./js/fps.js";

const infoListElem = document.getElementById("infoList");

const pongData = {
  gameMode: "demo",
  displayWidth: 800,
  delayAfterPoint: 1000,
  delayRestartAfterWin: 2000,
  winningScore: 11,
  bounds: {
    top: 28.2,
    right: 240,
    bottom: 192,
    left: 37,
  },
  ball: {
    colour: "#ffffff",
    serveVx: 3,
    serveVy: 2,
    vx: 6,
    width: 5.3,
    height: 5.3,
  },
  paddle: {
    colour: "#ffffff",
    width: 5.3,
    height: 21.2,
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
const svgPong = new SVGPong(dataPong);
const info = new Info(dataPong, infoListElem);

dataPong.startGame();

loop();

function loop() {
  // pong.update();
  //   testArea.update();
  dataPong.update();
  info.update();
  svgPong.draw();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
