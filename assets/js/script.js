let timerCountEl = document.querySelector('.timer-count');
let startButton = document.querySelector('#start-button');

let $homeEl = $('#home');
let $leaderboardEl = $('#leaderboard');
let $leaderboardBodyEl = $('#leaderboard-body');
let $questionEl = $('#question');
let $buttonEl = $('.list-unstyled');
let $viewLeaderboardEl = $('#view-leaderboard');
let $highscoreFormEl = $('#highscore-form');
let $highscoreEl = $('#highscore');
let $homeButtonEl = $('#go-home-button');
let $newHighscoreEl = $('#new-highscore');
let $wrongAnswerEl = $('#wrong-ans');
let $clearHighscoreEl = $('#clear-highscores');

let questionNo = 0;
let randomized = []
let score = 0;
let secondsLeft;
let currentQuestion = [];
let highscores = [];
let win = false;

let questionBank = [
    //Question 1
    {
        question: 'What does an ARRAY do?',
        answer: 'Its a special variable which can hold more than one value.',
        possibleAnswers: ['Returns true if argument is null, false otherwise',
            'creates a function',
            'makes a boolean',
            'it is like a satalite dish and receives signals.']
    },
    //Question 2
    {
        question: 'In what situation would you use an IF statement?',
        answer: 'When you want either a TRUE or FALSE answer',
        possibleAnswers: ['let i = 0; while(i) { console.log(i); i--; }',
            'When you want to create a string.',
            'When you want to make a bowl of icecream',
            'When you want to create a loop.']
    },
    //Question 3
    {
        question: 'Which of these is the correct code for a LOOP?',
        answer: 'for (let i = 0; i < cars.length; i++){text += cars[i]+"<br>";',
        possibleAnswers: ['for (let i = 0; i <{text += cars[i]+"<br>";',
            'for (let i = 0; i < cars.length; i++){text += cars[i]+"<br>";',
            'localStorage.createItem("highscores", JSON.stringify(highscores));',
            'localStorage.item("highscores", JSON.stringify(highscores));']
    },
    //Question 4
    {
        question: 'What can be used to escape a symbol inside a string?',
        answer: '\\',
        possibleAnswers: ['\\', '.\\', '/', './']
    },
    //Question 5
    {
        question: 'What is the purpose of the break keyword in a switch statement?',
        answer: 'Without it, code not matching the criteria may incidentally execute',
        possibleAnswers: ['Without it, code not matching the criteria may incidentally execute',
            'It has no real purpose',
            'It is needed to break out of the switch once a given condition is met,',
            'It is used to check if a given code block must be executed']
    },
    //Question 6
    {
        question: 'What is the === operator checking for??',
        answer: 'strict equality',
        possibleAnswers: ['strict equality',
            'true equality',
            'type equality',
            'harsh equality']
    }
];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function nextQuestion() {

    currentQuestion = randomized[questionNo];

    let choices = shuffleArray(currentQuestion.possibleAnswers);

    $buttonEl.children().remove()

    $questionEl.children('h3').text(currentQuestion.question);

    choices.forEach((x) => {
        let y = "<li class=\"m-2\"><button class=\"col-12 btn btn-secondary\">" + x + "</button></li>";
        let $el = $(y);
        $buttonEl.append($el);
    });

    questionNo++;
}

function toggleLeaderboard() {
    if ( $questionEl.hasClass('d-none')){ 
        if ($leaderboardEl.hasClass('d-none')) {
            showLeaderboard();
        } else {
            showHome();
        }
    }
}

function displayQuestions() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.removeClass('d-none');
    $highscoreEl.addClass('d-none');
}

function showLeaderboard() {
    $leaderboardEl.removeClass('d-none');
    $clearHighscoreEl.removeClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreEl.addClass('d-none');
    $viewLeaderboardEl.text('Back to Quiz');
}

function showHome() {
    $leaderboardEl.addClass('d-none');
    $clearHighscoreEl.addClass('d-none');
    $homeEl.removeClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreEl.addClass('d-none');
    $newHighscoreEl.addClass('d-none');
    $viewLeaderboardEl.text('View Leaderboard');

    timerCountEl.innerHTML = '120';
    questionNo = 0;
    score = 0;
    win = false;
}

function showHighscoreInput() {
    $leaderboardEl.addClass('d-none');
    $homeEl.addClass('d-none');
    $questionEl.addClass('d-none');
    $highscoreEl.removeClass('d-none');
    $highscoreEl.children('h3').children().text(score);

    let temp = [...highscores];
    temp.push([name, score]);
    temp.sort(function(a, b) { return b[1] - a[1] }).splice(10);

    if(score >= temp[0][1]) {
        $newHighscoreEl.removeClass('d-none');
    }
}

function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function setupLeaderboard() {
    $leaderboardBodyEl.children().remove();

    highscores.forEach((x, i) => {
        let y = "<tr><th scope=\"row\">" + (i+1) + "</th><td>" + x[0] + "</td><td>" + x[1] + "</td></tr>";
        let $el = $(y);
        $leaderboardBodyEl.append($el);
    });
}

function init() {
    randomized = shuffleArray(questionBank);

    let storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }

    setupLeaderboard();
}

function clearHighscores() {
    highscores = [];
    storeHighscores();
    setupLeaderboard();
}

function submitHighscore(event) {
    event.preventDefault();
    const $nameEl = $('input[name="initials-text"]')
    const name = $nameEl.val();
    const reg = /[^A-Za-z]/g;

    if (!name) {
        return;
    }

    if (name.length !== 3) {
        alert("Please enter 3 letters");
        return;
    }

    if(reg.test(name)) {
        alert("Please use only letters for initials");
        return;
    }

    highscores.push([name.toUpperCase(), score]);
    highscores.sort(function(a, b) { return b[1] - a[1] }).splice(10);

    storeHighscores();
    setupLeaderboard();
    showHome();

    $nameEl.text('');
}

function checkAnswer(event) {
    if(event.target.innerHTML === currentQuestion.answer) {

        if ((questionNo) >= randomized.length) {
            if (secondsLeft > 80) {
                score += 80;
            } else {
                score += secondsLeft; 
            }
            win = true;
            showHighscoreInput();
            } else {
                score += 4;
                nextQuestion();
            }
        } else {
            $wrongAnswerEl.text('Wrong Answer');
            $wrongAnswerEl.fadeIn('fast');
            $wrongAnswerEl.fadeOut('slow');
            secondsLeft -= 3;
        }
}

function startGame() {
    secondsLeft = timerCountEl.textContent;

    displayQuestions();
    nextQuestion();


    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerCountEl.innerHTML = secondsLeft;

        if (secondsLeft >= 0) {
            if (win && secondsLeft > 0) {
                clearInterval(timerInterval);
            }
        }

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            alert('Times Up!');
            showHighscoreInput();
        }

    }, 1000);
}

startButton.addEventListener('click', startGame);

$buttonEl.on('click', '.btn', checkAnswer);

$viewLeaderboardEl.hover(function() {
    $(this).css('cursor','pointer');
});

$viewLeaderboardEl.on('click', toggleLeaderboard);

window.addEventListener('load', function() {
    init();
});

$highscoreFormEl.on('submit', submitHighscore);
$homeButtonEl.on('click',showHome);
$clearHighscoreEl.on('click', clearHighscores);