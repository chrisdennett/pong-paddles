import { Info } from './Info.js';
import { Paddle } from './Paddle.js';
import { Ball } from '/Ball.js'; 

const parentElement = document.getElementById("main");

export class Pong{
    constructor(bounds){
        this.bounds = bounds;
        this.div = document.createElement("div");
        this.div.classList = ["playArea"]
        parentElement.appendChild(this.div)
        this.ball = new Ball(this.bounds, this.div);
        this.paddleLeft = new Paddle({parentElement:this.div, bounds, ball:this.ball, side:"left"});
        this.paddleRight = new Paddle({parentElement:this.div, bounds, ball:this.ball, side:"right"});
        this.info = new Info(this.ball);
    }

    update(){
        this.ball.update();
        this.paddleLeft.update();
        this.paddleRight.update();
        this.info.update();
    }
}
