let flipCard = document.querySelectorAll('#flipCard');

flipCard.forEach(
    (element) =>
        (element.onclick = function () {
            element.classList.toggle('hover');
        })
);
