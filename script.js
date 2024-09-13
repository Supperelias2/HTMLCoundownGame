// script.js
let countdownElement = document.getElementById('countdown');
let gameButton = document.getElementById('game-button');

let initialCountdown = 3.00;
let countdownInterval;
let hiddenTimerStarted = false;
let hiddenTimerStartTime;
let hiddenTimerDuration = 10.00; // 10 seconden

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
}

gameButton.addEventListener('click', buttonPressed);
startInitialCountdown();
