const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const flagContainer = document.getElementById('flag-container');
const answerButtons = document.getElementById('answer-buttons');
const flagElement = document.getElementById('flag');
const resultElement = document.getElementById('result');
let scoreElement = document.getElementById('score');

let shuffledFlags, currentFlagIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentFlagIndex++;
    setNextFlag();
})

function startGame() {
    startButton.classList.add('hide');
    shuffledFlags = flagsOne.sort(() => Math.random() - 0.5);
    currentFlagIndex = 0
    timerElement.classList.remove('hide');
    flagContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    setNextFlag();
}

function setNextFlag() {
    resetState();
    flagContainer.classList.remove('hide');
    answerButtons.classList.remove('hide');
    resultElement.classList.add('hide');
    showFlag(shuffledFlags[currentFlagIndex]);
}

function showFlag(flag) {
    flagElement.src = flagsOne[currentFlagIndex].image
    flag.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedAnswer = e.target
    const correct = selectedAnswer.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
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


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function increaseScore() {
    let currentScore = parseInt(scoreElement.innerText);
    scoreElement.innerText = ++currentScore;
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}