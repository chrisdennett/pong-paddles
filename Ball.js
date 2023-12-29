export class Ball{
    constructor(){
        this.div = document.getElementById("ball");
        this.bounds = {
            top: 0,
            right: 400,
            bottom: 400,
            left: 0
        }
        this.x = 100;
        this.y = 200;
        this.vx = 2;
        this.vy = 3;
        this.height = 20,
        this.width = 20
    }

    update(){
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.x += this.vx;
        this.y += this.vy;


        if(this.x >= this.bounds.right - this.width){
            this.x = this.bounds.right - this.width;
            this.vx = -this.vx;
        }

        if(this.x < this.bounds.left){
            this.x = this.bounds.left;
            this.vx = -this.vx;
        }

        if(this.y >= this.bounds.bottom - this.height){
            this.y = this.bounds.bottom - this.height;
            this.vy = -this.vy;
        }

        if(this.y < this.bounds.top){
            this.y = this.bounds.top;
            this.vy = -this.vy;
        }
    }
}