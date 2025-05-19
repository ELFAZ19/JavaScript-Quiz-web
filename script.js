// Quiz Questions
const quizQuestions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3,
        type: "mcq"
    },
    {
        question: "JavaScript is the same as Java.",
        options: ["True", "False"],
        answer: 1,
        type: "truefalse"
    },
    {
        question: "Which method adds one or more elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0,
        type: "mcq"
    },
    {
        question: "What will 'typeof null' return in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        answer: 2,
        type: "mcq"
    },
    {
        question: "Which operator returns true if the two values are equal without type conversion?",
        options: ["==", "===", "=", "!=="],
        answer: 1,
        type: "mcq"
    },
    {
        question: "JavaScript is a statically typed language.",
        options: ["True", "False"],
        answer: 1,
        type: "truefalse"
    },
    {
        question: "Which of these is NOT a JavaScript framework?",
        options: ["React", "Angular", "Laravel", "Vue"],
        answer: 2,
        type: "mcq"
    },
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: ["The current function", "The global object", "The object that owns the executing code", "The parent object"],
        answer: 2,
        type: "mcq"
    },
    {
        question: "All JavaScript objects inherit properties and methods from a prototype.",
        options: ["True", "False"],
        answer: 0,
        type: "truefalse"
    },
    {
        question: "Which method converts a JSON string to a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
        answer: 0,
        type: "mcq"
    }
];

// DOM Elements
const questionCountElement = document.getElementById('question-count');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const timerElement = document.getElementById('time');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.querySelector('.result-container');
const finalScoreElement = document.getElementById('final-score');
const performanceMessageElement = document.getElementById('performance-message');
const restartButton = document.getElementById('restart-btn');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let shuffledQuestions = [];

// Initialize Quiz
function initQuiz() {
    // Shuffle questions
    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    
    // Update UI
    scoreElement.textContent = `Score: ${score}`;
    questionCountElement.textContent = `Question 1/${shuffledQuestions.length}`;
    progressBar.style.width = '0%';
    
    // Show quiz container
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    
    // Load first question
    loadQuestion();
}

// Load Question
function loadQuestion() {
    // Reset timer
    resetTimer();
    startTimer();
    
    // Get current question
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    // Update question count
    questionCountElement.textContent = `Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
    
    // Update progress bar
    progressBar.style.width = `${((currentQuestionIndex) / shuffledQuestions.length) * 100}%`;
    
    // Set question text
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Disable next button initially
    nextButton.disabled = true;
}

// Select Option
function selectOption(selectedIndex) {
    // Stop timer
    clearInterval(timer);
    
    // Get current question
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    // Get all option buttons
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Check if answer is correct
    if (selectedIndex === currentQuestion.answer) {
        // Correct answer
        options[selectedIndex].classList.add('correct');
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        // Wrong answer
        options[selectedIndex].classList.add('incorrect');
        options[currentQuestion.answer].classList.add('correct');
    }
    
    // Enable next button
    nextButton.disabled = false;
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Timer Functions
function startTimer() {
    timerElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.textContent = timeLeft;
}

function timeUp() {
    // Disable all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Show correct answer
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    options[currentQuestion.answer].classList.add('correct');
    
    // Enable next button
    nextButton.disabled = false;
}

// Show Results
function showResults() {
    // Hide quiz container
    quizContainer.classList.add('hidden');
    
    // Show result container
    resultContainer.classList.remove('hidden');
    
    // Calculate percentage
    const percentage = (score / shuffledQuestions.length) * 100;
    
    // Set final score
    finalScoreElement.textContent = `You scored ${score} out of ${shuffledQuestions.length}`;
    
    // Set performance message
    let message;
    if (percentage >= 80) {
        message = "Excellent! You're a JavaScript expert!";
    } else if (percentage >= 60) {
        message = "Good job! You know your JavaScript well!";
    } else if (percentage >= 40) {
        message = "Not bad! Keep learning!";
    } else {
        message = "Keep practicing! You'll get better!";
    }
    performanceMessageElement.textContent = message;
}

// Event Listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', initQuiz);

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', initQuiz);