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


/** 
 * Create an array of the correct answer and two wrong answers
 **/
function buildFullAnswerArray() {
    let fullAnswerArray = []; {
        fullAnswerArray.push(newFlags[0].country);
        fullAnswerArray.push(newFlags[60].country);
        fullAnswerArray.push(newFlags[80].country);
    }
    return fullAnswerArray
}

let allAnswers = buildFullAnswerArray();
console.log(allAnswers);

// Shuffle the allAnswers array so that the order of the countries in the answers will be randomised
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


//   Need to iterate through the above adding one each time DO/WHILE TIMER loop?? Although the image comes from +1 on newFlags and the answers come from finalAnswers. checkAnswer will need some thought as the game continues...

document.getElementById('answer-1').innerText = finalAnswers[0];
document.getElementById('answer-2').innerText = finalAnswers[1];
document.getElementById('answer-3').innerText = finalAnswers[2];
document.getElementById('flag').src = newFlags[0].image;

// Take one correct country from the shuffled array using index[0] and then plus one for each new set of questions. Display flag from index[0] in div
// Take two incorrect countries from the shuffled array using index [60] and index [120] and then plus one for each new set of questions
// Add all of them to an array - the correct country plus two incorrect countries
// Create a new random array from the newly created array of three



// let randomCountryOne = Math.floor(Math.random() * flags.length);
// let randomCountryTwo = Math.floor(Math.random() * flags.length);
// let randomCountryThree = Math.floor(Math.random() * flags.length);

// console.log(flags[randomCountryOne].country);
// console.log(flags[randomCountryTwo].country);
// console.log(flags[randomCountryThree].country);

// The above code failed as received two countries the same in one instance...Ireland!
// ? If using this method, use a if loop to check if the values are the different...if true use random country, if flase run again?


let answer1 = document.getElementById('answer-1');
let answer2 = document.getElementById('answer-2');
let answer3 = document.getElementById('answer-3');

answer1.addEventListener('click', checkAnswer);
answer2.addEventListener('click', checkAnswer);
answer3.addEventListener('click', checkAnswer);

/** 
 * Check button onclick whether correct answer or not - event listner
 * If correct - return CORRECT! for 500 milliseconds and advance to next question
 * If incorrect - return WRONG!
**/ 
function checkAnswer() {
    if (this.textContent === newFlags[0].country) {
        let correct = `CORRECT! <button id="next-question">Next flag >></button>`
        document.getElementById('result').innerHTML = correct;
        increaseCorrectScore();
    } else {
        let incorrect = `WRONG! <button id="next-question">Try the next flag >></button>`
        document.getElementById('result').innerHTML = incorrect;
    }
}
/**
 * Gets the current score from the DOM and increments it by 1
 */
function increaseCorrectScore() {
    let currentScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++currentScore;
}

// let nextFlag = document.getElementById('next-question');
// nextFlag.addEventListener('click', nextQuestion);

// function nextQuestion(){
//     createNewFlags();
//     buildFullAnswerArray();
//     createShuffledAnswers();
// }

// function buildNextQuestionArray() {
//     let nextQuestionArray = []; 
//     for (question of nextQuestionArray) {
//         nextQuestionArray.push(newFlags[0++].country);
//         nextQuestionArray.push(newFlags[60++].country);
//         nextQuestionArray.push(newFlags[120++].country);
//     }
//     return nextQuestionArray
// }

// let nextQuestion = buildNextQuestionArray(newFlags);
// console.log(nextQuestion);

// function nextQuestion() {
//     if ()
//  }
 