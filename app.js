import { Pong } from "./Pong.js";
// import { PongTestArea } from "./PongTestArea.js";
import { calculateFPS } from "./fps.js";

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

loop();

function loop() {
  pong.update();
  //   testArea.update();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
