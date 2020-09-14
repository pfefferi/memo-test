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
