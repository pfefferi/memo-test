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
        });
    });
}

function resetImagesDouble() {
    imagesDouble = images.concat(images);
}
