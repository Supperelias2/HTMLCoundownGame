// script.js
let countdownElement = document.getElementById('countdown');
let gameButton = document.getElementById('game-button');
let startButton = document.getElementById('start-button');
let instructionScreen = document.getElementById('instruction-screen');
let gameScreen = document.getElementById('game-screen');
let quoteElement = document.getElementById('quote');

let initialCountdown = 3.00;
let countdownInterval;
let hiddenTimerStarted = false;
let hiddenTimerStartTime;
let hiddenTimerDuration = 10.00; // 10 seconden

// Quotes array
let quotes = [
    "Gemaakt door ChatGPT, een AI zonder tijdsbesef.",
    "Als 10 seconden te lang voelen, ben je in goed gezelschap.",
    "Dit spel is goedgekeurd door procrastinators wereldwijd.",
    "Geen pixels raakten oververhit tijdens het maken van dit spel.",
    "10 seconden: sneller dan je wifi maar trager dan je oma.",
    "Gecodeerd door een AI die geen klok kan lezen.",
    "Als je wint, krijg je... helemaal niets!",
    "Het aftellen begint... nu! Of was het toch straks?",
    "Bedankt voor het spelen! Je interne klok is nu geüpdatet.",
    "Als tijd geld is, dan ben je nu 10 seconden armer.",
    "Gegarandeerd 0% kans op het winnen van een prijs.",
    "Heb je al op de knop gedrukt? Te vroeg!",
    "Dit spel is beter dan niets doen. Toch?",
    "De tijd vliegt... of staat stil. Wie zal het zeggen?",
    "Gemaakt met 1's, 0's en een beetje magie.",
    "Als je dit leest, ben je waarschijnlijk afgeleid.",
    "Je hebt 10 seconden om deze quote te lezen. Succes!",
    "Dit spel is jouw dagelijkse dosis geduldtraining.",
    "Verlies je gevoel voor tijd, niet je gevoel voor humor.",
    "Gemaakt door iemand die ook niet tot 10 kan tellen."
];

function showInstructionScreen() {
    instructionScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    quoteElement.textContent = '';
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
    countdownElement.className = '';
    hiddenTimerStarted = false;
    startInitialCountdown();

    // Update quote
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];
    quoteElement.textContent = randomQuote;
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
        countdownElement.className = 'feedback-perfect';
    } else if (absDifference < 0.50) {
        countdownElement.className = 'feedback-close';
    } else {
        countdownElement.className = 'feedback-far';
    }
}

startButton.addEventListener('click', startGame);
showInstructionScreen();
