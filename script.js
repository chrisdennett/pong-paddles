
loop();

function loop(){
    console.log("2")
    window.requestAnimationFrame(()=>loop())
}
