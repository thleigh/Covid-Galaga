let movementDisplay;
let game;
let spriteNames = ['hero', 'missile', 'enemy', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6', 'enemy7', 'enemy8'];
let missile;
let ctx;
let hero;
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

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    // scoreDisplay.textContent = `${hero.x}`;
    scoreDisplay.textContent = '1000';

    moveHero();

    shootMissile();

    if(start) {
        setTimeout(function() {
            moveEnemy();
            moveEnemy2();
            moveEnemy4();
            moveEnemy5();
        }, 3000);
    }
}

function moveHero() {
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
}

function drawMissile() {
        if(missiles.length)
            for(let i = 0; i < missiles.length; i++) {
            ctx.drawImage(missile, missiles[i][0], missiles[i][1], missiles[i][2], missiles[i][3]);
        }
}

function shootMissile() {
    moveMissile();
    drawMissile();
    if (controller.shoot && missiles.length <= missileTotal) {
        missiles.push([hero.x + 20, hero.y - 20, 5, 15])
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
sprites.enemy.src = 'assets/enemy2.png'
sprites.enemy2.src = 'assets/enemy2.png'
sprites.enemy3.src = 'assets/enemy3.png'
sprites.enemy4.src = 'assets/enemy2.png'
sprites.enemy5.src = 'assets/enemy2.png'
sprites.enemy6.src = 'assets/enemy3.png'

//Character Refs
hero = new Crawler(165, 550, 30, 30, sprites.hero.src);
enemy = new Crawler(-10, 400, 20, 20, sprites.enemy.src);
enemy2 = new Crawler(-50, 450, 20, 20, sprites.enemy2.src);
enemy3 = new Crawler(120, -20, 20, 20, sprites.enemy3.src);
enemy4 = new Crawler(310, 400, 20, 20, sprites.enemy.src);
enemy5 = new Crawler(350, 450, 20, 20, sprites.enemy2.src);
enemy6 = new Crawler(200, -20, 20, 20, sprites.enemy3.src);

// enemy = new Image();
// enemy.src = 'assets/enemy2.png'
missile = new Image();
missile.src = 'assets/missile.png'

document.addEventListener('keydown', controller.keyListenerDown, false);
document.addEventListener('keyup', controller.keyListenerUp, false);

score = document.getElementById('top-left');
highScore = document.getElementById('top-middle');
title = document.getElementById('title');
startBtn = document.getElementById('startBtn')
instructions = document.getElementById('instructions');
let start = startBtn.addEventListener('click', function () {
    score.style.display = 'block';
    highScore.style.display = 'block';
    startBtn.style.display = 'none';
    title.style.display = 'none';
    instructions.style.display = 'none';
    start = true;
})
let runGame = setInterval(gameLoop, 60);

//width: 350, height: 600;

function moveEnemy() {
    enemy.render()
    if(enemy.x < 140)
        enemy.x += 8;
    if(enemy.y > 40)
        enemy.y -= 8;
    else if(enemy.y <= 40)
    enemy.y -= 0.5;

    enemy3.render()
    if(enemy.y < 15)
        enemy3.y += 7;
}

function moveEnemy2() {
    enemy2.render()
    if(enemy2.x < 100)
        enemy2.x += 8;
    if(enemy2.y > 40)
        enemy2.y -= 8;
    else if(enemy2.y <= 40)
        enemy2.y -= 0.5;
}

function moveEnemy4() {
    enemy4.render()
    if(enemy4.x > 180)
        enemy4.x -= 8;
    if(enemy4.y > 40)
        enemy4.y -= 8;
    else if(enemy4.y <= 40)
    enemy4.y -= 0.5;

    enemy6.render()
    if(enemy4.y < 15)
        enemy6.y += 7;
}


function moveEnemy5() {
    enemy5.render()
    if(enemy5.x > 220)
        enemy5.x -= 8;
    if(enemy5.y > 40)
        enemy5.y -= 8;
    else if(enemy5.y <= 40)
        enemy5.y -= 0.5;
}
