const questions = [
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function myFunction()", correct: true },
            { text: "function = myFunction()", correct: false },
            { text: "function:myFunction()", correct: false },
            { text: "myFunction()", correct: false },
            
        ]
    },
    {
        question: "Which method removes the last element from an array and returns that element?",
        answers: [

            { text: "shift()", correct: false },
            { text: "pop()", correct: true },
            { text: "unshift()", correct: false },
            { text: "slice()", correct: false }
        ]
    },
    {
        question: "Which method rearranges the elements of an array into alphabetical or numerical order?",
        answers: [
            { text: "every()", correct: false },
            { text: "reduce()", correct: false },
            { text: "sort()", correct: true },
            { text: "includes()", correct: false }
        ]
    },

    {
        question: "Which method creates a new array, populated with the results of calling a provided function on every element in the calling array?",
        answers: [
            { text: "forEach()", correct: false },
            { text: "filter()", correct: false },
            { text: "map()", correct: true },
            { text: "reduce()", correct: false }
        ]
    },
    {
        question: "In React,which method is used to change state?",
        answers: [
            { text: "changeState()", correct: false },
            { text: "setState()", correct: true },
            { text: "onChange()", correct: false },
            { text: "stateSet()", correct: false }
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;        //After Clicking one option disables another options
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
  }

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();