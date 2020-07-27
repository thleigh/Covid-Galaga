console.log('hello world');

console.log('ellho');
let movementDisplay;
let game;
let hero;
let ogre;
let ctx;

//Crawler Constructor function
function Crawler(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const detectHit = () => {
    //check for collision on x axis
    //if the hero's bottom value is > ogre's top value
    if (hero.x + hero.width > ogre.x &&
        hero.x < ogre.x + ogre.width &&
        hero.y + hero.height > ogre.y &&
        hero.y < ogre.y + ogre.height) 
        {
        ogre.alive = false;   
        console.log('COLLISION!');
    }
}

const gameLoop = () => {
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    //display the x, y, coordinates of our hero onto the DOM
    movementDisplay.textContent = `X:${hero.x}\nY:${hero.y}`;
    //check if the ogre is alive and
    if(ogre.alive) {
        //render the ogre
        ogre.render()
        //check the collision
        detectHit();
    }
    //TODO detectHit()
    //render the hero
    hero.render()
}

const movementHandler = e => {
    // console.log(e);
    //when user presses w
    //w: 87, a: 65, s: 83, d: 68
    //look up velocity
    switch (e.keyCode) {
        case(87): //w up
            if(hero.y > 0) hero.y -= 10
            break;
        case(83): //s down
            if(hero.y + hero.height < game.height) hero.y +=10
            break;
        case(65): //a left
            if(hero.x > 0) hero.x -= 10
            break;
        case(68): //d right
            if(hero.x + hero.width < game.width) hero.x +=10
            break;

        default: 
            console.log('invalid keystroke');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    //DOM REFS
    movementDisplay = document.getElementById('movement');
    game = document.getElementById('game');
    
    //CANVAS CONFIG
    game.setAttribute('height', 400);
    game.setAttribute('width', 800);
    ctx = game.getContext('2d');
    
    //Character Refs
    ogre = new Crawler(300,100, 80, 120, '#bada55');
    hero = new Crawler(20, 100, 50, 50, 'hotpink');

    document.addEventListener('keydown', movementHandler);
    
    let runGame = setInterval(gameLoop, 60);
})
