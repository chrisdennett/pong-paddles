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
    surround: "#3783fa",
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
    scoreLeft: "white",
    scoreRight: "white",
    text: "white",
  },
  display: {
    showNet: true,
    showSides: false,
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
    size: 5,
  },
  paddle: {
    colour: "#ffffff",
    width: 5,
    height: 20,
    speed: 5,
    computerSpeed: 5,
  },
};

// pong 2 data alterations
const pongData2 = structuredClone(pongData);
pongData2.palette.screen = "red";
pongData2.palette.inlay = "red";

const dataPong = new DataPong(pongData);
const dataPong2 = new DataPong(pongData2);
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
