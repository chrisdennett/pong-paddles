import { Info } from './Info.js';
import { Paddle } from './Paddle.js';
import { Ball } from '/Ball.js'; 

export class Pong{
    constructor(bounds){
        this.bounds = bounds;
        this.ball = new Ball(this.bounds);
        this.paddleLeft = new Paddle({bounds, ball:this.ball, side:"left"});
        this.paddleRight = new Paddle({bounds, ball:this.ball, side:"right"});
        this.info = new Info(this.ball);
    }

    update(){
        this.ball.update();
        this.paddleLeft.update();
        this.paddleRight.update();
        this.info.update();
    }
}
