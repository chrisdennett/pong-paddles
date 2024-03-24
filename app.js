import { calculateFPS } from "./js/fps.js";
import "./js/pongTester/PongPaddleTester.js";

const pongPaddleTester = document.getElementById("pongPaddleTester");
pongPaddleTester.setup();

// const pong = document.getElementById("pong");
// const pongTester = document.getElementById("pongTester");

// SET UP
// pong.setup();
// pong.start();

// pongTester.setup();
// pongTester.start();

// KICK OFF
loop();

// LOOP
function loop() {
  // pong.loop();
  // pongTester.loop();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
