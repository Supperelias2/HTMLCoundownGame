// script.js
let countdownElement = document.getElementById('countdown');
let gameButton = document.getElementById('game-button');
let startButton = document.getElementById('start-button');
let instructionScreen = document.getElementById('instruction-screen');
let gameScreen = document.getElementById('game-screen');

let initialCountdown = 3.00;
let countdownInterval;
let hiddenTimerStarted = false;
let hiddenTimerStartTime;
let hiddenTimerDuration = 10.00; // 10 seconden

function showInstructionScreen() {
    instructionScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}

function startGame() {
    instructionScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    resetGame();
}

function startInitialCountdown() {
    let startTime = Date.now();
    countdownInterval = setInterval(function() {
        let elapsed = (Date.now() - startTime) / 1000;
        let remaining = (initialCountdown - elapsed).toFixed(2);
        if (remaining > 0) {
            countdownElement.textContent = remaining;
        } else {
            clearInterval(countdownInterval);
            startHiddenTimer();
        }
    }, 10);
}

function startHiddenTimer() {
    countdownElement.textContent = 'Druk op de knop na 10 seconden';
    gameButton.disabled = false;
    hiddenTimerStarted = true;
    hiddenTimerStartTime = Date.now();
}

function resetGame() {
    gameButton.removeEventListener('click', resetGame);
    gameButton.addEventListener('click', buttonPressed);
    gameButton.textContent = 'Druk hier';
    gameButton.disabled = true;
    countdownElement.textContent = '3.00';
    countdownElement.className = ''; // Reset class
    hiddenTimerStarted = false;
    startInitialCountdown();
}

function buttonPressed() {
    if (!hiddenTimerStarted) return;
    let elapsed = (Date.now() - hiddenTimerStartTime) / 1000;
    let difference = (elapsed - hiddenTimerDuration).toFixed(2);
    let absDifference = Math.abs(difference);
    let seconds = Math.floor(absDifference);
    let hundredths = Math.round((absDifference - seconds) * 100);

    let message = '';
    if (difference > 0) {
        message = `Je was ${seconds} seconden en ${hundredths} honderdstes te laat.`;
    } else if (difference < 0) {
        message = `Je was ${seconds} seconden en ${hundredths} honderdstes te vroeg.`;
    } else {
        message = 'Perfect timing!';
    }

    countdownElement.textContent = message;
    gameButton.textContent = 'Opnieuw spelen';
    gameButton.removeEventListener('click', buttonPressed);
    gameButton.addEventListener('click', resetGame);

    // Visuele feedback
    if (absDifference < 0.10) {
        // Minder dan 0.10 seconden verschil
        countdownElement.className = 'feedback-perfect';
    } else if (absDifference < 0.50) {
        // Minder dan 0.50 seconden verschil
        countdownElement.className = 'feedback-close';
    } else {
        // Meer dan 0.50 seconden verschil
        countdownElement.className = 'feedback-far';
    }
}

startButton.addEventListener('click', startGame);
showInstructionScreen();
