import { Info } from './Info.js';
import { Paddle } from './Paddle.js';
import { Ball } from '/Ball.js'; 

const bounds = {
    top: 0,
    right: 400,
    bottom: 400,
    left: 0
}
const ball = new Ball(bounds);
const paddleLeft = new Paddle({bounds, ball, side:"left"});
const paddleRight = new Paddle({bounds, ball, side:"right"});
const info = new Info(ball);

loop();

function loop(){
    update();
    
    window.requestAnimationFrame(()=>loop())
}

function update(){
    ball.update();
    paddleLeft.update();
    paddleRight.update();
    info.update();
}
