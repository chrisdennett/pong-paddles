import { DataPong } from "./js/dataPong/DataPong.js";
import { Info } from "./js/Info.js";
import { calculateFPS } from "./js/fps.js";

const infoListElem = document.getElementById("infoList");

const pongData = {
  gameMode: "demo",
  displayWidth: 350,
  delayAfterPoint: 1000,
  delayRestartAfterWin: 2000,
  winningScore: 11,
  useGapBug: false,
  useScoreBasedPaddleSizes: false,
  palette: {
    surround: "red",
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
  ball: {
    serveVx: 3,
    serveVy: 1,
    vx: 5,
    maxVy: 3,
    size: 5,
  },
  paddle: {
    width: 5,
    height: 20,
    speed: 5,
    computerSpeed: 5,
  },
};

const dataPong = new DataPong(pongData);
const info = new Info(dataPong, infoListElem);

const main = document.getElementById("main");

const totalPongs = 15;
const pongGames = [];
const hueStep = 360 / totalPongs;

for (let i = 0; i < totalPongs; i++) {
  const randomPongData = structuredClone(pongData);
  const hue = hueStep * i;
  randomPongData.palette.surround = `hsl(${hue}, 60%, 40%)`;
  randomPongData.palette.screen = `hsl(${hue}, 60%, 40%)`;
  randomPongData.palette.inlay = `hsl(${hue}, 50%, 50%)`;

  const dataPong = new DataPong(randomPongData);
  const pongGame = document.createElement("svg-pong");
  main.appendChild(pongGame);
  pongGame.setup(dataPong);
  pongGames.push({ game: pongGame, data: dataPong });
  dataPong.startGame();
}

loop();

function loop() {
  for (let p of pongGames) {
    p.data.update();
    p.game.draw();
  }

  info.update();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
