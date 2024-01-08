// Select game screens
const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');

// Game start listener
gameStart.addEventListener('click', onGameStart);

// Global key listeners

// Game start function
function onGameStart() {
    gameStart.classList.add('hide');
 
    // Render Monika
    const monika = document.createElement('div');
    monika.classList.add('monika');
    monika.style.top = '200px';
    monika.style.left = '200px';
    gameArea.appendChild(monika);
}
