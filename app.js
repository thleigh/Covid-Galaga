let movementDisplay;
let game;
let spriteNames = ['hero', 'missile'];
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

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    // highScoreDisplay.textContent = `${hero.x}`;
    scoreDisplay.textContent = `${scoreTotal}`;
    
    moveHero();

    shootMissile();

    drawEnemy();

    detectMissileHit();
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

let missileTotal = 10;
let missiles = [];
let scoreTotal = 0;
let missileSize = 15;

function drawMissile() {
    if(missiles.length)
        for(let i = 0; i < missiles.length; i++) {
        ctx.drawImage(missile, missiles[i][0], missiles[i][1], missileSize/2, missileSize);
    }
}

function detectMissileHit() {

    for(let i = 0; i < missiles.length; i++) {
        for(let e = enemies.length - 1; e >= 0; e--) {
        let diffX = Math.abs(enemies[e].x - missiles[i][0]);
        let diffY = Math.abs(enemies[e].y - missiles[i][1]);
        let dist = Math.sqrt(diffX * diffX + diffY * diffY)
            if(dist < (enemySize + missileSize) / 2)  {

                enemies.splice(e, 1);
                scoreTotal += 100;
            }
        }
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
            missiles[i][1] -= 5;
                
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

//Character Refs
hero = new Crawler(165, 550, 30, 30, sprites.hero.src);

enemy = new Image();
enemy.src = 'assets/enemy3.png'
missile = new Image();
missile.src = 'assets/missile.png'

document.addEventListener('keydown', controller.keyListenerDown, false);
document.addEventListener('keyup', controller.keyListenerUp, false);

score = document.getElementById('top-right');
highScore = document.getElementById('top-middle');
title = document.getElementById('title');
startBtn = document.getElementById('startBtn')
instructions = document.getElementById('instructions');
tryAgainBtn = document.getElementById('tryAgain');
let intro = new Audio('assets/galaga-intro.mp4')

let start = startBtn.addEventListener('click', function () {
    score.style.display = 'block';
    highScore.style.display = 'block';
    startBtn.style.display = 'none';
    title.style.display = 'none';
    instructions.style.display = 'none';
    start = true;
    intro.play()
    let spawnInterval = setInterval(spawn, 1000);
})

let end = tryAgainBtn.addEventListener('click', function() {
    tryAgainBtn.style.display = 'none';
})

let runGame = setInterval(gameLoop, 60);
let shootInterval = setInterval(moveMissile, 20);

let enemies = [];
let enemySize = 25;
let speed = 5;

function spawn() {
    enemies.push({x:Math.random()*game.width, y:-20}) 
}

function drawEnemy() {
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].y += speed;
        ctx.drawImage(enemy, enemies[i].x - enemySize/2, enemies[i].y - enemySize/2, enemySize, enemySize);
        
        //detects distance
        let diffX = Math.abs(enemies[i].x - hero.x);
        let diffY = Math.abs(enemies[i].y - hero.y);
        let dist = Math.sqrt(diffX * diffX + diffY * diffY);
        
        //detects hit
        if(dist < (hero.height + enemySize)/2 || hero.x < -10 || hero.x > 350
        || hero.y < 0 || hero.y > 600)  {
            enemies = [];
            hero.x = hero.y = 550;
            hero.alive = false;
            tryAgainBtn.style.display = 'block';
        }
    }   
}

function gameOver() {

}

