import { Paddle } from './Paddle.js';
import { Ball } from '/Ball.js'; 

const bounds = {
    top: 0,
    right: 400,
    bottom: 400,
    left: 0
}
const paddle1 = new Paddle(bounds);
const ball = new Ball(bounds);

loop();

function loop(){

    ball.update();
    paddle1.update();
    
    window.requestAnimationFrame(()=>loop())
}
