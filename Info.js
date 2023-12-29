export class Info{
    constructor(ball){
        this.ball = ball;
        this.ballDirElem = document.getElementById("ballDirection");
        this.ballSpeedXElem = document.getElementById("ballSpeedX");
        this.ballSpeedYElem = document.getElementById("ballSpeedY");
        this.ballX = document.getElementById("ballX");
        this.ballY = document.getElementById("ballY");
    }

    update(){
        this.ballDirElem.innerHTML = this.ball.vx < 0 ? "left" : "right";
        this.ballSpeedXElem.innerHTML = this.ball.vx;
        this.ballSpeedYElem.innerHTML = this.ball.vy;
    }
}