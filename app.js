let movementDisplay;
let game;
let hero;
let ogre;
let ctx;
let xVel = 0;
let controller;
let loop;
let shipObj = new Image();

//Crawler Constructor function
function Crawler(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.image.src = 'assets/ship.png';
    this.alive = true;
    this.render = function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
}

controller = {
    left: false,
    rigth: false,

    keyListener: function(e) {
            let key_state = (event.type == "keydown")?true:false;

        switch (e.keyCode) {
            case(37):
                controller.left = key_state;
                break;
            case(39):
                controller.right = key_state;
                break;
            case(32):
        
            default:
        }
    }
};

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    // scoreDisplay.textContent = `${hero.x}`;
    scoreDisplay.textContent = '1000';

    if (controller.left) {
        xVel -= 0.5;
    }
    if (controller.right) {
        xVel += 0.5;
    }

    hero.x += xVel;
    xVel *= 0.9;

    hero.render()
}


//DOM REFS
scoreDisplay = document.getElementById('score');
highScoreDisplay = document.getElementById('highScore');
game = document.getElementById('game');
    
//CANVAS CONFIG
game.setAttribute('height', 600);
game.setAttribute('width', 350);
ctx = game.getContext('2d');
    
//Character Refs
ogre = new Crawler(130,100, 80, 120, shipObj);
hero = new Crawler(165, 550, 30, 30, shipObj);

document.addEventListener('keydown', controller.keyListener);
document.addEventListener('keyup', controller.keyListener);
    
let runGame = setInterval(gameLoop, 30);
