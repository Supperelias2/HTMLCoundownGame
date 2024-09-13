let countdownElement = document.getElementById('countdown');
let gameButton = document.getElementById('game-button');
let startButton = document.getElementById('start-button');
let instructionScreen = document.getElementById('instruction-screen');
let gameScreen = document.getElementById('game-screen');
let quoteElement = document.getElementById('quote');
let leaderboardList = document.getElementById('leaderboard-list');

let initialCountdown = 3.00;
let countdownInterval;
let hiddenTimerStarted = false;
let hiddenTimerStartTime;
let hiddenTimerDuration = 10.00; // 10 seconds

// Quotes array
let quotes = [
    "Made by an AI who can't tell time.",
    "If 10 seconds feels too long, you're not alone.",
    "This game is procrastinator-approved!",
    "No pixels were harmed in the making of this game.",
    "10 seconds: faster than your Wi-Fi, slower than a sloth.",
    "Programmed by an AI that can't read clocks.",
    "Win or lose, you get... absolutely nothing!",
    "The countdown begins... now! Or maybe later?",
    "Thanks for playing! Your internal clock is now updated.",
    "If time is money, you're now 10 seconds poorer.",
    "Guaranteed 0% chance of winning a prize.",
    "Did you press the button yet? Too soon!",
    "This game is better than doing nothing. Right?",
    "Time flies... or stands still. Who knows?",
    "Built with 1's, 0's, and a bit of magic.",
    "If you're reading this, you're probably distracted.",
    "You have 10 seconds to read this quote. Go!",
    "Your daily dose of patience training.",
    "Lose your sense of time, not your sense of humor.",
    "Created by someone who also can't count to 10.",
    "Warning: May cause an existential crisis about time.",
    "Time's up! Or is it?",
    "Loading... please wait 10 seconds.",
    "Is it me, or did 10 seconds just get longer?",
    "You just wasted 10 seconds. Want to waste more?",
    "Time is an illusion. Lunchtime doubly so.",
    "Feeling lucky? Try timing 10 seconds!",
    "Achievement unlocked: Master of Time (Not).",
    "Press the button. Regret nothing.",
    "This game has no bugs. Just features.",
    "Don't worry, the button won't bite.",
    "Time waits for no one, except in this game.",
    "If at first you don't succeed, blame the timer.",
    "Is it 10 seconds yet? Only one way to find out.",
    "They say patience is a virtue. Prove it!",
    "Ready, set, wait...",
    "Time you enjoy wasting is not wasted time.",
    "Just when you think you nailed it... you didn't.",
    "Time to test your time-telling skills!",
    "Can you beat the AI at its own game?"
];

// Load leaderboard from localStorage or initialize empty array
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

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
    countdownElement.textContent = 'Press the button after 10 seconds';
    gameButton.disabled = false;
    hiddenTimerStarted = true;
    hiddenTimerStartTime = Date.now();
}

function resetGame() {
    gameButton.removeEventListener('click', resetGame);
    gameButton.addEventListener('click', buttonPressed);
    gameButton.textContent = 'Press Here';
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
    let difference = (elapsed - hiddenTimerDuration);
    let absDifference = Math.abs(difference);
    let totalDifference = absDifference.toFixed(2);

    let message = '';
    if (difference > 0) {
        message = `${totalDifference} sec too late!`;
    } else if (difference < 0) {
        message = `${totalDifference} sec too early!`;
    } else {
        message = 'Perfect timing!';
    }

    countdownElement.textContent = message;
    gameButton.textContent = 'Play Again';
    gameButton.removeEventListener('click', buttonPressed);
    gameButton.addEventListener('click', resetGame);

    // Visual feedback
    if (absDifference < 0.10) {
        countdownElement.className = 'feedback-perfect';
    } else if (absDifference < 0.50) {
        countdownElement.className = 'feedback-close';
    } else {
        countdownElement.className = 'feedback-far';
    }

    // Save time to leaderboard
    saveTime(absDifference);

    // Update leaderboard display
    updateLeaderboard();
}

function saveTime(timeDifference) {
    // Add the new time to the leaderboard array
    leaderboard.push(timeDifference);
    // Sort the leaderboard array in ascending order
    leaderboard.sort(function(a, b) {
        return a - b;
    });
    // Keep only top 5 scores
    leaderboard = leaderboard.slice(0, 5);
    // Save to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function updateLeaderboard() {
    // Clear the current leaderboard list
    leaderboardList.innerHTML = '';
    // Create list items for each score
    leaderboard.forEach(function(time, index) {
        let listItem = document.createElement('li');
        listItem.textContent = `${(time).toFixed(2)} sec`;
        leaderboardList.appendChild(listItem);
    });
}

// Initialize leaderboard on page load
updateLeaderboard();

startButton.addEventListener('click', startGame);
showInstructionScreen();
