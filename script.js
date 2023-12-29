import { Ball } from '/Ball.js'; 
const paddle1 = document.getElementById("paddle1");
const ball = new Ball()

loop();

function loop(){

    ball.update()
    
    window.requestAnimationFrame(()=>loop())
}
