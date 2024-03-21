import { calculateFPS } from "./js/fps.js";

const pong = document.getElementById("pong");
const pongTester = document.getElementById("pongTester");

// SET UP
pong.setup();
pong.start();
pongTester.setup();

// KICK OFF
loop();

// LOOP
function loop() {
  pong.loop();
  pongTester.loop();

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
