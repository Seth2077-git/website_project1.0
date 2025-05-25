const questions = [
    {
        question: "Kumpulan dari matahari, planet dan benda langit lainnya disebut...",
        answers: [
            { text: "Satelit", correct: false },
            { text: "Tata surya", correct: true },
            { text: "Galaksi", correct: false },
            { text: "Bima sakti", correct: false }
        ]
    },
    {
        question: "Planet yang letaknya paling jauh dari matahari adalah...",
        answers: [
            { text: "Merkurius", correct: false },
            { text: "Uranus", correct: false },
            { text: "Neptunus", correct: true },
            { text: "Saturnus", correct: false }
        ]
    },
    {
        question: "Planet terbesar dalam tata surya adalah planet...",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Bumi", correct: false },
            { text: "Neptunus", correct: false }
        ]
    },
    {
        question: "Benda langit yang mempunyai jalur elips dan mempunyai ekor disebut dengan…",
        answers: [
            { text: "Meteor", correct: false },
            { text: "Asteroid", correct: false },
            { text: "Bintang jatuh", correct: false },
            { text: "Komet", correct: true }
        ]
    },
    {
        question: "Apa nama bintang yang menjadi pusat tata surya?",
        answers: [
            { text: "Bulan", correct: false },
            { text: "Mars", correct: false },
            { text: "Matahari", correct: true },
            { text: "Jupiter", correct: false }
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
        button.addEventListener("click", selectAnswer);
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
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Kamu Berhasil Menjawab ${score} dari ${questions.length} soal !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();