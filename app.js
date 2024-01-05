import { Pong } from "./Pong.js";
import { SVGPong } from "./SVGPong.js";
// import { PongTestArea } from "./PongTestArea.js";
import { calculateFPS } from "./fps.js";

const svgParams = {
  ball: {
    vx: 20,
    vy: 50,
    width: 5.3,
    height: 5.3,
  },
  paddle: {
    colour: "#f9f9f9",
    width: 5.3,
    height: 21.2,
    speed: 6,
  },
  bounds: {
    top: 0,
    right: 1000,
    bottom: 800,
    left: 0,
  },
  gameBounds: {
    top: 28.2,
    right: 240,
    bottom: 192,
    left: 37,
  },
  winningScore: 11,
};

const params = {
  ball: {
    vx: 20,
    vy: 50,
  },
  paddle: {
    width: 20,
    height: 60,
    speed: 6,
  },
  bounds: {
    top: 0,
    right: 500,
    bottom: 400,
    left: 0,
  },
  winningScore: 11,
};

const parentElement = document.getElementById("main");

// const testArea = new PongTestArea(bounds, parentElement);
const pong = new Pong(params, parentElement);
const svgPong = new SVGPong(svgParams);

loop();

function loop() {
  pong.update();
  //   testArea.update();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
