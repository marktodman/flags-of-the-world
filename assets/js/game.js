const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const answerButtons = document.getElementById('answer-buttons');

nextButton.addEventListener('click', buildNextQuestionArray);
/**
 * Set 60 second countdown timer. Code modified from Grepper: https://www.codegrepper.com/code-examples/javascript/add+countdown+timer+to+javascript+quiz
 */
let count = 60;
let interval = setInterval(function () {
    document.getElementById('timer').innerHTML = count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        document.getElementById('timer').innerHTML = 'GAME OVER'; // this is where I can add what to do once the timer ends - take to the GAME OVER score html page
    }
}, 1000);

/**
 * Function to randomly sort array modified from: https://www.codegrepper.com/code-examples/javascript/how+to+randomly+sort+an+array+javascript 
 */
function createNewFlags(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let newFlags = createNewFlags(flags);
console.log(newFlags[0].country);

let currentFlagIndex = 0;
console.log(newFlags[currentFlagIndex]);

let wrongFlagIndex = 12;
console.log(newFlags[wrongFlagIndex]);

let anotherWrongFlagIndex = 21;
console.log(newFlags[anotherWrongFlagIndex]);

/** 
 * Create an array of the correct answer and two wrong answers
 **/
function buildFullAnswerArray() {
    let fullAnswerArray = []; {
        fullAnswerArray.push(newFlags[currentFlagIndex].country);
        fullAnswerArray.push(newFlags[wrongFlagIndex].country);
        fullAnswerArray.push(newFlags[anotherWrongFlagIndex].country);
    }
    return fullAnswerArray
}

let allAnswers = buildFullAnswerArray();
console.log(allAnswers);

/** 
 * Shuffle the allAnswers array so that the order of the countries in the answers will be randomised
 **/
function createShuffledAnswers(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let finalAnswers = createShuffledAnswers(allAnswers);
console.log(finalAnswers);


    document.getElementById('flag').src = newFlags[currentFlagIndex].image;

    let answer1 = document.getElementById('answer-1');
    let answer2 = document.getElementById('answer-2');
    let answer3 = document.getElementById('answer-3');

    answer1.innerText = finalAnswers[0];
    answer2.innerText = finalAnswers[1];
    answer3.innerText = finalAnswers[2];

    answer1.addEventListener('click', checkAnswer);
    answer2.addEventListener('click', checkAnswer);
    answer3.addEventListener('click', checkAnswer);


/** 
 * Check button onclick whether correct answer or not - event listner
 * If correct - return 'CORRECT!' and change the body color to green
 * If incorrect - return 'WRONG!' and change the body color to red
 **/

function checkAnswer() {
    if (this.textContent === newFlags[currentFlagIndex].country) {
        let correct = true
        let correctAnswer = `CORRECT!`
        document.getElementById('result').innerHTML = correctAnswer;
        setStatusClass(document.body, correct);
        increaseScore();
    } else {
        let wrong = false
        let wrongAnswer = `WRONG!`
        document.getElementById('result').innerHTML = wrongAnswer;
        setStatusClass(document.body, wrong);
    }
    nextButton.classList.remove('hide');
    answerButtons.classList.add('hide');
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function increaseScore() {
    let currentScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++currentScore;
}
/**
 * Adds a class to the body depending on whether the answer is correct or wrong. Allows the body color to be changed depending on correct or wrong answers.
 * Adapted from Web Dev Simplified YouTube Video: https://www.youtube.com/watch?v=riDzcEQbX6k
 */
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

/**
 * Resets class status on body. Used when setting the nextQuestion()
 * Adapted from Web Dev Simplified YouTube Video: https://www.youtube.com/watch?v=riDzcEQbX6k
 */
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
}

// function buildNextQuestionArray() {
//     currentFlagIndex = ++currentFlagIndex;
//     wrongFlagIndex = ++wrongFlagIndex;
//     anotherWrongFlagIndex = ++anotherWrongFlagIndex;
//     let nextQuestionArray = []; {
//         nextQuestionArray.push(newFlags[currentFlagIndex].country);
//         nextQuestionArray.push(newFlags[wrongFlagIndex].country);
//         nextQuestionArray.push(newFlags[anotherWrongFlagIndex].country);
//     }
//     return nextQuestionArray
// }

// let nextAnswers = buildNextQuestionArray();
// console.log(nextAnswers);