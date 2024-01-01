import { Pong } from "./Pong.js";
// import { PongTestArea } from "./PongTestArea.js";
import { calculateFPS } from "./fps.js";

const params = {
  ball: {
    vx: 7,
    vy: 9,
  },
};

const parentElement = document.getElementById("main");

const bounds = {
  top: 0,
  right: 400,
  bottom: 400,
  left: 0,
};

// const testArea = new PongTestArea(bounds, parentElement);
const pong = new Pong(bounds, parentElement);

loop();

function loop() {
  pong.update();
  //   testArea.update();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
