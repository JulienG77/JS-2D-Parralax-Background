const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width= 800;
const CANVAS_HEIGHT = canvas.height= 700;

let gamespeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'Backgrounds/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = 'Backgrounds/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'Backgrounds/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = 'Backgrounds/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = 'Backgrounds/layer-5.png';

/**** OLD CODE ANIMATION PRLX BACKGROUND */
/*
let x = 0;
let x2 = 2400;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4, x ,0);
    ctx.drawImage(backgroundLayer4, x2 ,0);
    if (x < -2400) x = 2400 + x2 - gamespeed;
    else x -= gamespeed;
    if (x2 < -2400) x2 = 2400 + x - gamespeed;
    else x2 -= gamespeed;
    requestAnimationFrame(animate);
};
animate();
*/

class layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gamespeed * this.speedModifier;
    }
    update(){
        this.speed = gamespeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new layer(backgroundLayer1, 0);
const layer2 = new layer(backgroundLayer2, 0.2);
const layer3 = new layer(backgroundLayer3, 0.4);
const layer4 = new layer(backgroundLayer4, 0.7);
const layer5 = new layer(backgroundLayer5, 1);

const slider = document.getElementById('slider');
slider.value = gamespeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gamespeed;
slider.addEventListener('change', function(e){
    gamespeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

/**  Trop de répétitions...
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer1.update();
    layer1.draw();

    layer2.update();
    layer2.draw();

    layer4.update();
    layer4.draw();

    layer5.update();
    layer5.draw();
    
    layer3.update();
    layer3.draw();
    requestAnimationFrame(animate);
};
animate();
/*** */

/** V2 Arrays */
const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object =>{
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
animate();