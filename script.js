
const paddle1 = document.getElementById("paddle1");
const ball = document.getElementById("ball");

loop();

function loop(){
    
    window.requestAnimationFrame(()=>loop())
}
