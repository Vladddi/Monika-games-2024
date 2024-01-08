// Select game screens
const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');

// Game start listener
gameStart.addEventListener('click', onGameStart);

// Global key listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


let keys = {};
let player = {
    x: 150,
    y: 100,
    width: 0,
    height: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4
};

// Game start function
function onGameStart() {
    gameStart.classList.add('hide');

    // Render Monika
    const monika = document.createElement('div');
    monika.classList.add('monika');
    monika.style.top = player.y + 'px';
    monika.style.left = player.x + 'px';
    gameArea.appendChild(monika);

    player.width = monika.offsetWidth;
    player.height = monika.offsetHeight;

    // Game infinite loop
    window.requestAnimationFrame(gameAction);
}

// Game loop function
function gameAction() {
    const monika = document.querySelector('.monika');

    // Register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowDown && player.y + player.height < gameArea.offsetHeight) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    // Apply movement
    monika.style.top = player.y + 'px';
    monika.style.left = player.x + 'px';

    window.requestAnimationFrame(gameAction);
}

// Key handlers
function onKeyDown(e) {
    keys[e.code] = true;
    // console.log(keys);
}
function onKeyUp(e) {
    keys[e.code] = false;
    // console.log(keys);
}