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

function startGame() {}
