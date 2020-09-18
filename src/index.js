const $button = document.querySelector('#button');
$button.onclick = function () {
    startGame();
};

function userInput() {
    const $flipCard = document.querySelectorAll('#flipCard');
    $flipCard.forEach((element) => {
        element.onclick = function () {
            if (element.classList.contains('hover')) {
            } else {
                element.classList.toggle('hover');
            }
        };
    });
}

function blockUserInput() {
    const $flipCard = document.querySelectorAll('#flipCard');
    $flipCard.forEach((element) => {
        element.onclick = function () {};
    });
}

function startGame() {
    stopTimer();
    resetBoard();
    resetScore();
    resetFirstCard();
    blockUserInput();
    setTimeout(() => {
        console.log('asd');
        resetImages();
        setImageClass();
        userInput();
        manageBoard();
        startTimer();
    }, 500);
}

////////// Randommize Image //////////

const images = ['kjjj', 'milazzo', 'santos', 'ravenna', 'lampone', 'medina'];
let imagesDouble = images.concat(images);

function getRandomImage() {
    const index = Math.floor(Math.random() * imagesDouble.length);
    const randomImage = imagesDouble[index];
    imagesDouble.splice(index, 1);
    return randomImage;
}

function setImageClass() {
    const $flipCardBack = document.querySelectorAll('#flipCardBack');
    $flipCardBack.forEach((card) => {
        const image = getRandomImage();
        card.classList.add(image);
        const $parent = card.parentNode.parentNode.parentNode;
        $parent.classList.add(`_${image}`);
    });
}

////////// Reset //////////

function resetBoard() {
    const $flipCard = document.querySelectorAll('#flipCard');
    $flipCard.forEach((element) => {
        if (element.classList.contains('hover')) {
            element.classList.toggle('hover');
        }
        if (element.classList.contains('match')) {
            element.classList.toggle('match');
        }
    });

    document.querySelector('.board-parent').classList.remove('hide');
    document.querySelector('.success').classList.add('hide');
    document.querySelector('.success-img').classList.add('hide');
    document.querySelector('.score-div').classList.add('hide');

    success = 0;
}

function resetImages() {
    resetCard();
    resetImagesDouble();
}

function resetCard() {
    const $flipCardBack = document.querySelectorAll('#flipCardBack');
    $flipCardBack.forEach((card) => {
        images.forEach((element) => {
            card.classList.remove(element);
            const $parent = card.parentNode.parentNode.parentNode;
            $parent.classList.remove(`_${element}`);
        });
    });
}

function resetImagesDouble() {
    imagesDouble = images.concat(images);
}

function resetFirstCard() {
    $firstCard = null;
}

////////// Manage Cards //////////

let firstCard = null;
let secondCard = null;

function manageBoard() {
    const $board = document.querySelector('.board');
    $board.onclick = function (event) {
        const $target = event.target;
        if ($target.classList.contains('flip-card-back')) {
            var parent = $target.parentNode.parentNode.parentNode;
        }
        if ($target.classList.contains('flip-card-front')) {
            var parent = $target.parentNode.parentNode.parentNode;
        }
        if ($target.classList.contains('flip-card-inner')) {
            var parent = $target.parentNode.parentNode;
        }
        if ($target.classList.contains('flip-card')) {
            var parent = $target.parentNode;
        }
        manageCards(parent, $target);
    };
}

function manageCards(element, target) {
    if (!firstCard) {
        firstCard = element;
        target.onclick = function () {};
    } else {
        secondCard = element;
        compareCards(firstCard, secondCard);
    }
}

function compareCards(first, second) {
    if (first === second) {
        secondCard = null;
    } else if (first.className == second.className) {
        animationMatch(first, second);
        firstCard = null;
        secondCard = null;
        attempts++;
        updateAttempts();
        success++;
        checkSuccess();
    } else {
        animationNoMatch(first, second);
        firstCard = null;
        secondCard = null;
        attempts++;
        updateAttempts();
    }
}

////////// Animations //////////

function animationMatch(first, second) {
    const $flipCard = document.querySelectorAll('#flipCard');
    $flipCard.forEach((element) => {
        if (element.parentNode === first) {
            setTimeout(() => {
                element.classList.toggle('match');
            }, 800);
        }
        if (element.parentNode === second) {
            setTimeout(() => {
                element.classList.toggle('match');
            }, 800);
        }
    });
}

function animationNoMatch(first, second) {
    const $flipCard = document.querySelectorAll('#flipCard');
    $flipCard.forEach((element) => {
        if (element.parentNode === first) {
            setTimeout(() => {
                element.classList.toggle('hover');
            }, 800);
        }
        if (element.parentNode === second) {
            setTimeout(() => {
                element.classList.toggle('hover');
            }, 850);
        }
    });
}

////////// Success //////////

let success = 0;

function checkSuccess() {
    if (success == 6) {
        setTimeout(() => {
            document.querySelector('.board-parent').classList.add('hide');
            document.querySelector('.success').classList.remove('hide');
            document.querySelector('.success-img').classList.remove('hide');
            document.querySelector('.score-div').classList.remove('hide');
            updateScore();
            stopTimer();
            game = false;
        }, 2500);
    }
}

////////// Score //////////

let attempts = 0;
let bestScore = 9999;

let time = '';
let bestTime = '59:59';

function updateAttempts() {
    document.querySelector('#attempts').textContent = attempts;
}

function resetScore() {
    attempts = 0;
    time = 0;
    updateAttempts();
}

function updateScore() {
    document.querySelector('.attempts').textContent = `Intentos: ${attempts}`;
    /*if (attempts < bestScore) {
        bestScore = attempts;
        document.querySelector(
            '.best-attempts'
        ).textContent = `${bestScore} intentos`;
    }*/

    document.querySelector('.time').textContent = `Tiempo: ${time}`;
    /*if (time <= bestTime) {
        // es string, no numero
        bestTime = time;
        document.querySelector('.best-time').textContent = `Tiempo: ${time}`;
    }
    if (bestTime === '59:59') {
        document.querySelector('.best-time').textContent = `Tiempo: ${time}`;
    }*/
}

////////// Timer //////////

let timerFunction;
let timeContainer = document.querySelector('#time');
let seconds = 0;
let minutes = 0;

function timer() {
    if (seconds === 59) {
        seconds = 0;
        minutes++;
        if (seconds > 9) {
            time = `${minutes}:${seconds}`;
            timeContainer.innerHTML = time;
        } else {
            time = `${minutes}:0${seconds}`;
            timeContainer.innerHTML = time;
        }
    } else {
        seconds++;
        if (minutes > 0) {
            if (seconds > 9) {
                time = `${minutes}:${seconds}`;
                timeContainer.innerHTML = time;
            } else {
                time = `${minutes}:0${seconds}`;
                timeContainer.innerHTML = time;
            }
        } else {
            time = `${seconds}`;
            timeContainer.innerHTML = time;
        }
    }
}

function startTimer() {
    timerFunction = setInterval(timer, 1000);
}

function stopTimer() {
    seconds = -1;
    minutes = 0;
    clearInterval(timerFunction);
}
