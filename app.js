let movementDisplay;
let game;
let spriteNames = ['hero', 'missile', 'enemy2'];
let enemy;
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
            case(90):
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
        case(90):
            controller.shoot = key_state;
        default:
    }
}
};

let missileTotal = 10;
let missiles = [];
let enemies = [];
let enemyTotal = 8;

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    // scoreDisplay.textContent = `${hero.x}`;
    scoreDisplay.textContent = '1000';

    if (controller.left && hero.x > 0) {
        xVel -= 6;
        hero.x += xVel;
        xVel *= 0.2;
    }
    if (controller.right && hero.x + hero.width < game.width) {
        xVel += 6;
        hero.x += xVel;
        xVel *= 0.2;
    }
    hero.render();
    moveMissile();
    drawMissile();
    drawEnemy();
    moveEnemy();

    if(controller.shoot && enemies.length <= enemyTotal) {
        enemies.push([0, 400, 20, 20])
    }

    if (controller.shoot && missiles.length <= missileTotal) {
        missiles.push([hero.x + 20, hero.y - 20, 5, 15])
    }  
}

let setUp = true;

function drawEnemy() {
    if(enemies.length)
        for(let i =0; i < enemies.length; i++) {
            ctx.drawImage(enemy, enemies[i][0], enemies[i][1], enemies[i][2], enemies[i][3]);
    }
}

function moveEnemy() {
    for(let i = 0; i < missiles.length; i++) {
        if(enemies[i][1] > -11) {
            // enemies[i][1] += 5;
            enemies[i][1] -= 5;
        } else if (enemies[i][1] < -10) {
            enemies.splice(i,1);
        }
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
sprites.enemy2.src = 'assets/enemy2.png'

//Character Refs
hero = new Crawler(165, 550, 30, 30, sprites.hero.src);

enemy = new Image();
enemy.src = 'assets/enemy2.png'
missile = new Image();
missile.src = 'assets/missile.png'

document.addEventListener('keydown', controller.keyListenerDown, false);
document.addEventListener('keyup', controller.keyListenerUp, false);

score = document.getElementById('top-left');
highScore = document.getElementById('top-middle');
title = document.getElementById('title');
startBtn = document.getElementById('startBtn')
instructions = document.getElementById('instructions');
startBtn.addEventListener('click', function () {
    score.style.display = 'block';
    highScore.style.display = 'block';
    startBtn.style.display = 'none';
    title.style.display = 'none';
    instructions.style.display = 'none';

        // setInterval(function() {
        //     drawEnemy();
        // }, 10);
})
let runGame = setInterval(gameLoop, 60);


// let x = 250;
// let y = 250;

// let srcX;
// let srcY;

// let sheetWidth = 800
// let sheetHeight = 600;

// let cols = 8;

// let width = sheetWidth/cols;
// let height = sheetHeight;

// let currentFrame = 0;

// let enemy = new Image ();
// enemy.src = 'assets/enemy1.png';

// function updateFrame() {
//     currentFrame = ++currentFrame%cols; // 1 % 8 = 1, 2 % 8 = 2. 8 % 8 = 1,
//     srcX = currentFrame * width;
//     srcY = 0;
//     ctx.clearRect(x, y, width, height);
// }

// function drawEnemy() {
//     updateFrame();
//     ctx.drawImage(enemy, srcX, srcY, width, height, x, y, width, height);
// }


