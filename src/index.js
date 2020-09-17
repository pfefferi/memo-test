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
    resetBoard();
    resetFirstCard();
    blockUserInput();
    setTimeout(() => {
        console.log('asd');
        resetImages();
        setImageClass();
        userInput();
        manageBoard();
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
        success++;
        checkSuccess();
    } else {
        animationNotMatch(first, second);
        firstCard = null;
        secondCard = null;
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

function animationNotMatch(first, second) {
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
        }, 2500);
    }
}
