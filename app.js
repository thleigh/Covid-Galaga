let movementDisplay;
let game;
let spriteNames = ['hero', 'missile', 'enemy1'];
let hero;
let missile;
let ctx;
let xVel = 0;
let yVel = 0;
let controller;
let loop;

let bg = new Image();
bg.src = 'assets/bg.png';

window.onload = function() {
    let bgHeight = 0;
    let scrollSpeed =  1;

    function loop () {
        ctx.drawImage(bg, 0, bgHeight);
        ctx.drawImage(bg, 0, bgHeight - game.height);
        ctx.globalCompositeOperation='destination-over';
        bgHeight += scrollSpeed;

        if (bgHeight == game.height)
            bgHeight = 0;

        window.requestAnimationFrame(loop);
    }
    loop();
}

//Crawler Constructor function
function Crawler(x, y, width, height, image) {
    this.image = new Image();
    this.image.src = image
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
}

controller = {
    left: false,
    rigth: false,
    shoot: false,

    keyListenerDown: function(e) {
            let key_state = (event.type == "keydown")?true:false;
            
        switch (e.keyCode) {
            case(37):
                controller.left = key_state;
                console.log(key_state)
                break;
            case(39):
                controller.right = key_state;
                break;
            case(32):
                controller.shoot = key_state;
            default:
        }
    },

    keyListenerUp: function(e) {
        let key_state = (event.type == "keyup")?false:true;
        
    switch (e.keyCode) {
        case(37):
            controller.left = key_state;
            break;
        case(39):
            controller.right = key_state;
            break;
        case(32):
            controller.shoot = key_state;
        default:
    }
}
};

let missileTotal = 10;
let missiles = [];


const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    // scoreDisplay.textContent = `${hero.x}`;
    scoreDisplay.textContent = '1000';

    if (controller.left && hero.x > 0) {
        xVel -= 4;
        hero.x += xVel;
        xVel *= 0.2;
    }
    if (controller.right && hero.x + hero.width < game.width) {
        xVel += 4;
        hero.x += xVel;
        xVel *= 0.2;
    }
    hero.render();
    moveMissile();
    drawMissile();

    if (controller.shoot && missiles.length <= missileTotal) {
        missiles.push([hero.x + 20, hero.y - 20, 5, 15])
    }  
}

function drawMissile() {
        if(missiles.length)
        for(let i = 0; i < missiles.length; i++) {
        ctx.drawImage(missile, missiles[i][0], missiles[i][1], missiles[i][2], missiles[i][3]);
        }
}

const moveMissile = () => { 
    for(let i = 0; i < missiles.length; i++) {
        if(missiles[i][1] > -11) {
            missiles[i][1] -= 15;
        } else if (missiles[i][1] < -10) {
            missiles.splice(i, 1);
        }
    }
}

//DOM REFS
scoreDisplay = document.getElementById('score');
highScoreDisplay = document.getElementById('highScore');
game = document.getElementById('game');
    
//CANVAS CONFIG
game.setAttribute('height', 600);
game.setAttribute('width', 350);
ctx = game.getContext('2d');

let sprites = {}
for (let i = 0; i < spriteNames.length; i++) {
    sprites[spriteNames[i]] = new Image();
}
sprites.hero.src = 'assets/ship.png'
sprites.missile.src = 'assets/missile.png'

//Character Refs
hero = new Crawler(165, 550, 30, 30, sprites.hero.src);
missile = new Image();
missile.src = 'assets/missile.png'
// missile = new Crawler(165, 520, 5, 12, sprites.missile.src);

document.addEventListener('keydown', controller.keyListenerDown, false);
document.addEventListener('keyup', controller.keyListenerUp, false);
    
let runGame = setInterval(gameLoop, 60);

