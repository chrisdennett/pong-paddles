export class Paddle{
    constructor({bounds, ball, side, parentElement}){
        this.side = side;
        this.ball = ball;
        this.div = document.createElement('div');
        this.div.classList.add("paddle");
        this.div.classList.add(side === "left" ? "paddleLeft" : "paddleRight");
        
        parentElement.appendChild(this.div);
        // this.div = document.getElementById(side === "left" ? "paddleLeft" : "paddleRight");
        this.width = 20;
        this.height = 100;
        this.bounds = bounds;
        this.x = this.side === "left" ? 0 : this.bounds.right - this.width;
        this.y = 0;

        this.center();
        this.setStyles();
    }

    update(){
        this.followBall();
        this.restrictToBounds();

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    followBall(){
        this.y = this.ball.y - this.height / 2;
    }

    restrictToBounds(){
        if(this.y < 0){
            this.y = 0;
        }
        
        if(this.y > this.bounds.bottom - this.height){
            this.y = this.bounds.bottom - this.height;
        }
    }

    setStyles(){
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    center(){
        this.y = this.bounds.bottom / 2 - this.height/ 2;
    }
}