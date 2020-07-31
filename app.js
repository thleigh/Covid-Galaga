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
    scoreDisplay.textContent = '0';
    
    moveHero();

    shootMissile();

    drawEnemy();
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
    // let missileInterval = setInterval(() => {
        for(let i = 0; i < missiles.length; i++) {
            if(missiles[i][1] > -11) {
                missiles[i][1] -= 5;
                
            } else if (missiles[i][1] < -10) {
                missiles.splice(i, 1);
            }
        }
    // }, 100)
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

let runGame = setInterval(gameLoop, 60);
let shootInterval = setInterval(moveMissile, 20);

let enemies = [];
let enemySize = 25;
let speed = 5;
let enemyTotal = 30


function spawn() {
    enemies.push({x:Math.random()*game.width, y:0}) 
}

function drawEnemy() {
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].y += speed;
        ctx.drawImage(enemy, enemies[i].x - enemySize/2, enemies[i].y - enemySize/2, enemySize, enemySize);
        
        //detects distance
        let diff_x = Math.abs(enemies[i].x - hero.x);
        let diff_y = Math.abs(enemies[i].y - hero.y);
        let dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
        
        //detects hit
        if(dist < (hero.height + enemySize)/2 || hero.x < 0 || hero.x > 350
        || hero.y < 0 || hero.y > 600)  {
            enemies = [];
            hero.x = hero.y = 550;
        }
    }   
}

