import { calculateFPS } from "./js/fps.js";
import "./js/pongTester/PongPaddleTester.js";

const pong = document.getElementById("pong");
const pongTester = document.getElementById("pongTester");
const pongPaddleTester = document.getElementById("pongPaddleTester");

// SET UP
let mode = "pongPaddleTester";

if (mode === "pong") {
  pong.setup();
  pong.start();

  pongTester.style.display = "none";
  pongPaddleTester.style.display = "none";
}

if (mode === "pongTester") {
  pongTester.setup();

  pong.style.display = "none";
  pongPaddleTester.style.display = "none";
}

if (mode === "pongPaddleTester") {
  pongPaddleTester.setup();

  pong.style.display = "none";
  pongTester.style.display = "none";
}

// KICK OFF
loop();

// LOOP
function loop() {
  if (mode === "pong") {
    pong.loop();
  }

  if (mode === "pongTester") {
    pongTester.loop();
  }

  if (mode === "pongPaddleTester") {
    pongPaddleTester.loop();
  }

  // Calculate and display FPS
  calculateFPS();

  window.requestAnimationFrame(() => loop());
}
