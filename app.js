let movementDisplay;
let game;
let spriteNames = ['hero', 'missile', 'enemy1'];
let hero;
// let missile;
let ctx;
let xVel = 0;
let yVel = 0;
let controller;
let loop;

//Crawler Constructor function
function Crawler(x, y, width, height, image) {
    this.image = new Image();
    this.image.src = image;
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

    keyListener: function(e) {
            let key_state = (event.type == "keydown")?true:false;

        switch (e.keyCode) {
            case(37):
                controller.left = key_state;
                e.preventDefault();
                break;
            case(39):
                controller.right = key_state;
                e.preventDefault();
                break;
            case(32):
                controller.shoot = key_state;
                e.preventDefault();
            default:
        }
    }
};


const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    // scoreDisplay.textContent = `${hero.x}`;
    scoreDisplay.textContent = '1000';

    if (controller.left && hero.x > 0) {
        xVel -= 0.6;
        hero.x += xVel;
        xVel *= 0.9;
    }
    if (controller.right && hero.x + hero.width < game.width) {
        xVel += 0.6;
        hero.x += xVel;
        xVel *= 0.9;
    }

    hero.render();

    if (controller.shoot) {
        shoot();
    }            
}
 
function Missile () {
    this.x = hero.x + 15;
    this.y = 535;
}
Missile.prototype.draw = function(newX, newY) {
    ctx.clearRect(this.x-5, this.y-5, 600, 20);
    newX = newX || this.x;
    newY = newY || this.y;
    this.x = newX; 
    this.y = newY;
    let missile = this;
    ctx.beginPath();
    ctx.arc(missile.x, missile.y, 4, 0, Math.PI*2, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}
Missile.prototype.shootUp = function () {
    let missile = this;
    inter = setInterval(function () {
        if(missile.x <=0) clearInterval(inter);
        missile.draw(missile.x, missile.y - 15);
    }, 10);
}
function shoot() {
    let currentMissile = new Missile();
    currentMissile.draw();
    currentMissile.shootUp();
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
ogre = new Crawler(500, 400, 100, 100, sprites.hero.src) 
hero = new Crawler(165, 550, 30, 30, sprites.hero.src);
missile = new Crawler(165, 520, 5, 12, sprites.missile.src);

document.addEventListener('keydown', controller.keyListener);
document.addEventListener('keyup', controller.keyListener);
    
let runGame = setInterval(gameLoop, 30);