let button = document.querySelector('#button');
button.onclick = function () {
    startGame();
    unlockUserInput();
};

function unlockUserInput() {
    let flipCard = document.querySelectorAll('#flipCard');
    flipCard.forEach((element) => {
        element.onclick = function () {
            element.classList.toggle('hover');
        };
    });
}

function startGame() {
    setImageClass();
}

const images = ['kjjj', 'milazzo'];

function getRandomImage() {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
}

function setImageClass() {
    let flipCard = document.querySelectorAll('#flipCardBack');
    flipCard.forEach((element) => {
        let image = getRandomImage();
        element.classList.add(image);
    });
}
