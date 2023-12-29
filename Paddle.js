export class Paddle{
    constructor(bounds){
        this.div = document.getElementById("paddle1");
        this.width = 20;
        this.height = 100;
        this.bounds = bounds;
        this.x = 0;
        this.y = 0;

        this.center()
        this.setStyles();
    }

    update(){
        this.div.style.transform = `translate(0, ${this.x}px)`
    }

    setStyles(){
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
    }

    center(){
        this.x = this.bounds.bottom / 2 - this.height/ 2;
    }
}