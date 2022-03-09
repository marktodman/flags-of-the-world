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
    currentFlagIndex++; // Move the shuffled flags array on by one each time next button is clicked
    setNextFlag(); // call function to build next flag and set answers buttons

});

//  Starts timer countdown. Creates shuffled flags array from flags.js. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function startGame() {
    startTimer(); // Call timer function
    navElement.classList.remove('hide'); // Show the home link so that the player can always restart
    startButton.classList.add('hide'); // Hide the start button for the rest of the game
    introElement.classList.add('hide'); // Hide the intro text on start
    scoreSection.classList.remove('hide'); // Show the score
    shuffledFlags = flagsArray.sort(() => Math.random() - 0.5); // Shuffle all flags and answers
    currentFlagIndex = 0; // Set the starting point in the shuffled array
    scoreElement.innerText = 0; // Rest the score to zero each time the game
    timerElement.classList.remove('hide'); // Make the timer visible
    flagContainer.classList.remove('hide'); // Show the flags
    answerButtons.classList.remove('hide'); // Make the question buttons visible
    newPlayer.classList.add('hide'); // Hide the New Player button on restart
    checkeredFlagElement.classList.add('hide'); // Hide the checkered flag on restart
    setNextFlag(); // Call the next flag function
}


//  Set 60 second countdown timer. Code modified from Grepper: https://www.codegrepper.com/code-examples/javascript/add+countdown+timer+to+javascript+quiz
function startTimer() {
    let count = 60; // 60 second timer
    let interval = setInterval(function () {
        timerElement.innerHTML = count;
        count--;
        if (count === 0) { // Take action once the timer reaches zero
            clearInterval(interval);
            flagElement.src = "";
            gameOver();
        }
    }, 1000);
}

// Create a start new game function 

// Gets ready to set the next flag and calls the showFlag function. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function setNextFlag() {
    resetState(); // Reset the game container to be ready for new flag and answers
    // flagContainer.classList.remove('hide'); // Show the flags
    answerButtons.classList.remove('hide');
    resultElement.classList.add('hide');
    showFlag(shuffledFlags[currentFlagIndex]); // Call the function to show the next flag and create answer buttons from shuffled flags array
}

// Show the flag and the answer buttons. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function showFlag(flag) {
    flagElement.src = flagsArray[currentFlagIndex].image; // Set the flag image
    flag.answers.forEach(answer => {
        const button = document.createElement('button'); // Create the answer buttons
        button.innerText = answer.text; // Put the country name in the buttons
        button.classList.add('btn'); // Add the class to style buttons
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Set the correct answer
        }
        button.addEventListener('click', checkAnswer); // Check the answer on click of a button
        answerButtons.appendChild(button); // Create the buttons as new elements
    });
}

// Clear Status to set up for next flag. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
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
        resultElement.innerHTML = `CORRECT!`; // Tell the player they are correct
        increaseScore();
    } else {
        resultElement.classList.remove('hide');
        resultElement.innerHTML = `WRONG!`; // Tell the player they are wrong
    }
    nextButton.classList.remove('hide'); // Allow the user to control the next flag
    answerButtons.classList.add('hide'); // Remove the answer buttons so that the player cannot keep clicking to either increase score or find correct answer
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

// Increase the score by one for a correct answer. No action for a wrong answer
function increaseScore() {
    currentScore = parseInt(scoreElement.innerText);
    scoreElement.innerText = ++currentScore;
}

// Clear background color based on correct or wrong answers. Code adapted from Web Dev Simplified. Available on YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

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

function reload() {
    window.location.replace("index.html");
}