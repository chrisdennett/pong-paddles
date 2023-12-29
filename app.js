
import { Pong } from './Pong.js';

const bounds = {
    top: 0,
    right: 400,
    bottom: 400,
    left: 0
}

const pong = new Pong(bounds)

loop();

function loop(){
    pong.update();
    
    window.requestAnimationFrame(()=>loop())
}

