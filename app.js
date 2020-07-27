let movementDisplay;
let game;
let hero;
let ogre;
let ctx;
let speed;
let friction;
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

const gameLoop = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    scoreDisplay.textContent = `${hero.x}`;


    if(ogre.alive) {
        ogre.render()
    }
    hero.render()
}

const movementHandler = e => {
    // console.log(e);
    // up: 38, left: 37, bottom: 40, right: 39,
    function animate() {
        speed = 2;
        friction = 0.98;
        switch (e.keyCode) {
            case(37): //a left
                if(hero.x > 0) hero.x -= 5;
                break;
            case(39): //d right
                if(hero.x + hero.width < game.width) hero.x +=5;
                break;

            default: 
                console.log('invalid keystroke');
        }
        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener('DOMContentLoaded', function() {
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
    console.log(hero);

    document.addEventListener('keydown', movementHandler);
    
    let runGame = setInterval(gameLoop, 60);
})
