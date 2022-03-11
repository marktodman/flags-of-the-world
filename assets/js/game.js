const navElement = document.getElementById('home');
const introElement = document.getElementById('intro-text');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const flagContainer = document.getElementById('flag-container');
const answerButtons = document.getElementById('answer-buttons');
const flagElement = document.getElementById('flag');
const resultElement = document.getElementById('result');
const scoreSection = document.getElementById('score-area');
const scoreElement = document.getElementById('score');
const playerName = document.getElementById('player-name');
const newPlayer = document.getElementById('new-player');
const checkeredFlagElement = document.getElementById('end');

let shuffledFlags, currentFlagIndex, currentScore;

// Starts the game on click of start button. Moves game through flags on click of next button. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentFlagIndex++;
    setNextFlag();

});

//  Starts the game and sets the container elements. Starts timer countdown. Creates shuffled flags array from flags.js. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function startGame() {
    startTimer();
    navElement.classList.remove('hide');
    startButton.classList.add('hide');
    introElement.classList.add('hide');
    scoreSection.classList.remove('hide');
    shuffledFlags = flagsArray.sort(() => Math.random() - 0.5);
    currentFlagIndex = 0;
    scoreElement.innerText = 0;
    timerElement.classList.remove('hide');
    flagContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    newPlayer.classList.add('hide');
    checkeredFlagElement.classList.add('hide');
    setNextFlag();
}

//  Set 60 second countdown timer. Code modified from Grepper: https://www.codegrepper.com/code-examples/javascript/add+countdown+timer+to+javascript+quiz
function startTimer() {
    let count = 60;
    let interval = setInterval(function () {
        timerElement.innerHTML = count;
        count--;
        if (count === 0) {
            clearInterval(interval);
            flagElement.src = "";
            gameOver();
        }
    }, 1000);
}

// Gets ready to set the next flag and calls the showFlag function. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function setNextFlag() {
    resetState();
    answerButtons.classList.remove('hide');
    resultElement.classList.add('hide');
    showFlag(shuffledFlags[currentFlagIndex]);
}

// Show the flag and create the answer buttons. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function showFlag(flag) {
    flagElement.src = flagsArray[currentFlagIndex].image;
    flag.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', checkAnswer);
        answerButtons.appendChild(button);
    });
}

// Clear status to set up for next flag. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Check the clicked answer button and take action whether correct or wrong. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function checkAnswer(e) {
    const selectedAnswer = e.target;
    const correct = selectedAnswer.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        resultElement.classList.remove('hide');
        resultElement.innerHTML = `CORRECT!`;
        increaseScore();
    } else {
        resultElement.classList.remove('hide');
        resultElement.innerHTML = `WRONG!`;
    }
    nextButton.classList.remove('hide');
    answerButtons.classList.add('hide');
}

// Set the background color based on correct or wrong answers. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Increase the score by one for a correct answer
function increaseScore() {
    currentScore = parseInt(scoreElement.innerText);
    scoreElement.innerText = ++currentScore;
}

// Clear background color based on correct or wrong answers. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Set up the game over position with the Player Name and Score. Option to start again as same player or restart as a new player
function gameOver() {
    timerElement.innerHTML = 'GAME OVER';
    resultElement.classList.remove('hide');
    resultElement.innerHTML = `Congratulations ${playerName.value} you scored ${currentScore}`;
    document.body.classList.remove('correct');
    document.body.classList.remove('wrong');
    flagElement.src = "";
    nextButton.classList.add('hide');
    flagContainer.classList.add('hide');
    answerButtons.classList.add('hide');
    scoreSection.classList.add('hide');
    startButton.classList.remove('hide');
    startButton.innerText = 'PLAY AGAIN >>';
    newPlayer.classList.remove('hide');
    checkeredFlagElement.classList.remove('hide');
}

newPlayer.addEventListener('click', reload);

// Set the restart position for a new player
function reload() {
    window.location.replace("index.html");
}