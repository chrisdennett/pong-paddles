import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

export class PongTestArea{
    constructor(bounds, parentElement){
        this.div = document.createElement("div");
        this.div.classList = ["playArea"]
        parentElement.appendChild(this.div)
        this.ball = new Ball(bounds, this.div);
        this.testPaddle = new Paddle({parentElement:this.div, bounds, ball:this.ball, side:"left"});
        
        this.ball.vy = 0;

        this.testPaddle.center();
        this.testPaddle.update()
    }

    update(){
        // this.testPaddle.center();
        this.ball.update()
    }
}