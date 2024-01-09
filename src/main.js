// Select game screens
const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');
const gamePoints = document.querySelector('.points');

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
    height: 0,
    lastTimeFiredSnowflake: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4,
    snowFlakeMultiplier: 5,
    fireInterval: 1000,
    mountainSpawnInterval: 3000,
    snowmanSpawnInterval: 1000,
    snowmanKillBonus: 2000
};
let scene = {
    score: 0,
    lastMountainSpawn: 0,
    lastSnowmenSpawn: 0,
    isActiveGame: true
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
function gameAction(timestamp) {
    const monika = document.querySelector('.monika');

    // Apply gravitation
    let isInAir = (player.y + player.height) <= gameArea.offsetHeight
    if (isInAir) {
        player.y += game.speed;
    }
    //Increment score count
    scene.score++;

    // Add snowmen
    if (timestamp - scene.lastSnowmenSpawn > game.snowmanSpawnInterval + 5000 * Math.random()) {
        let snowman = document.createElement('div');
        snowman.classList.add('snowman');
        snowman.x = gameArea.offsetWidth - 60;
        snowman.style.left = snowman.x + 'px';
        snowman.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';
        gameArea.appendChild(snowman);
        scene.lastSnowmenSpawn = timestamp;
    }

    // Add mountains
    if (timestamp - scene.lastMountainSpawn > game.mountainSpawnInterval + 20000 * Math.random()) {
        let mountain = document.createElement('div');
        mountain.classList.add('mountain');
        mountain.x = gameArea.offsetWidth - 200;
        mountain.style.left = mountain.x + 'px';
        mountain.style.top = (gameArea.offsetHeight - 56) * Math.random() + 'px';
        gameArea.appendChild(mountain);
        scene.lastMountainSpawn = timestamp;
    }
    // Modify snowman positions
    let snowmen = document.querySelectorAll('.snowman');
    snowmen.forEach(snowman => {
        snowman.x -= game.speed * 3;
        snowman.style.left = snowman.x + 'px';
        if (snowman.x + snowmen.offsetWidth <= 0) {
            snowman.parentElement.removeChild(snowman);
        }
    });
    // Modify mountain positions
    let mountains = document.querySelectorAll('.mountain');
    mountains.forEach(mountain => {
        mountain.x -= game.speed;
        mountain.style.left = mountain.x + 'px';

        if (mountain.x + mountain.offsetWidth <= 0) {
            mountain.parentElement.removeChild(mountain);
        }
    });

    // Modify snowflake positions
    let snowFlakes = document.querySelectorAll('.snowflake');
    snowFlakes.forEach(snowFlake => {
        snowFlake.x += game.speed * game.snowFlakeMultiplier;
        snowFlake.style.left = snowFlake.x + 'px';

        if (snowFlake.x + snowFlake.offsetWidth > gameArea.offsetWidth) {
            snowFlake.parentElement.removeChild(snowFlake);
        }
    });

    // Register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowDown && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    if (keys.Space && timestamp - player.lastTimeFiredSnowflake > game.fireInterval) {
        monika.classList.add('monika-fire');
        snowFlake(player);
        player.lastTimeFiredSnowflake = timestamp;

        isCollision(monika, monika);
    } else {
        monika.classList.remove('monika-fire');
    }

    // Apply movement
    monika.style.top = player.y + 'px';
    monika.style.left = player.x + 'px';

    // Apply score
    gamePoints.textContent = scene.score;

    if (scene.isActiveGame) {
        window.requestAnimationFrame(gameAction);
    }

    // Collision detection
    snowmen.forEach(snowman => {
        if (isCollision(monika, snowman)) {
            gameOverAction();
        }

        snowFlakes.forEach(snowFlake => {
            if (isCollision(snowFlake, snowman)) {
                scene.score += game.snowmanKillBonus;
                snowman.parentElement.removeChild(snowman);
                snowFlake.parentElement.removeChild(snowFlake);
            }
        })
    });
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

function gameOverAction() {
    scene.isActiveGame = false;
    gameOver.classList.remove('hide');
}

function isCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom ||
        firstRect.bottom < secondRect.top ||
        firstRect.right < secondRect.left ||
        firstRect.left > secondRect.right);
}

function snowFlake() {
    let snowFlake = document.createElement('div');

    snowFlake.classList.add('snowflake');
    snowFlake.style.top = (player.y + player.height / 3 - 5) + 'px';
    snowFlake.x = player.x + player.width;
    snowFlake.style.left = snowFlake.x + 'px';
    gameArea.appendChild(snowFlake);

    gameArea.appendChild(snowFlake);
}