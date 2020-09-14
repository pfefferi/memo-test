const $button = document.querySelector('#button');
$button.onclick = function () {
    startGame();
    unlockUserInput();
};

function unlockUserInput() {
    const $flipCard = document.querySelectorAll('#flipCard');
    $flipCard.forEach((element) => {
        element.onclick = function () {
            element.classList.toggle('hover');
        };
    });
}

function startGame() {
    resetImages();
    setImageClass();
    resetFirstCard();
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
        const $parent = card.parentNode.parentNode;
        $parent.classList.add(`_${image}`);
    });
}

////////// Reset //////////

function resetImages() {
    resetCard();
    resetImagesDouble();
}

function resetCard() {
    const $flipCardBack = document.querySelectorAll('#flipCardBack');
    $flipCardBack.forEach((card) => {
        images.forEach((element) => {
            card.classList.remove(element);
            const $parent = card.parentNode.parentNode;
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

let $firstCard = null;
let secondCard = null;

function manageBoard() {
    const $board = document.querySelector('.board');
    $board.onclick = function (event) {
        const $element = event.target;
        if ($element.classList.contains('flip-card-back')) {
            var parent = $element.parentNode.parentNode.parentNode;
        }
        if ($element.classList.contains('flip-card-front')) {
            var parent = $element.parentNode.parentNode.parentNode;
        }
        if ($element.classList.contains('flip-card-inner')) {
            var parent = $element.parentNode.parentNode;
        }
        if ($element.classList.contains('flip-card')) {
            var parent = $element.parentNode;
        }
        manageCards(parent);
    };
}

function manageCards(element) {
    if (!$firstCard) {
        firstCard = element;
    } else {
        secondCard = element;
        compareCards(firstCard, secondCard);
    }
}

function compareCards(first, second) {
    if (first === second) {
        firstCard = null;
        secondCard = null;
    } else if (first.className == second.className) {
        console.log('match');
        animationMatch(first, second);
        firstCard = null;
        secondCard = null;
    } else {
        console.log('not match');
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
