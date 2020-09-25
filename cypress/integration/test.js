const URL = '127.0.0.1:8080';

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('juega al memotest', () => {
        const numberOfCards = 12;

        it('Checks if there is a board with cards', () => {
            cy.get('.board')
                .find('.cardContainer')
                .should('have.length', numberOfCards);
        });

        it('Checks if the cards are randomly generated', () => {
            cy.get('.button').click();
            let originalClasses = [];
            cy.get('.cardContainer').then((cards) => {
                cards.each((i, card) => {
                    originalClasses.push(card.classList);
                    //console.log(card.classList);
                });
            });

            cy.visit(URL);
            cy.get('.button').click();
            let newClasses = [];
            cy.get('.cardContainer').then((newCards) => {
                newCards.each((i, card) => {
                    newClasses.push(card.classList);
                });
                //console.log(originalClasses, newClasses);
                cy.wrap(originalClasses).should('not.deep.equal', newClasses);
            });
        });
        it('chooses a wrong combination of cards', () => {
            cy.visit(URL);
            cy.get('.button').click();
            cy.wait(1000);

            cy.get('.cardContainer').then((cards) => {
                console.log(cards[0].classList[1]);
                let pairs = getPairs(cards);
                let cardPairs = Object.values(pairs);
                cy.get(cardPairs[0][0]).click();
                cy.get(cardPairs[1][0]).click();
                cy.wait(1000);
            });
        });
        it('finishes the game', () => {
            cy.get('.cardContainer').then((cards) => {
                let cardPairs = getPairs(cards);
                const newLocal = Object.values(cardPairs);
                cy.get(newLocal).then((pairs) => {
                    pairs.each((i, pair) => {
                        cy.get(pair[0]).click();
                        cy.get(pair[1]).click();
                    });
                    cy.wait(1000);
                });
            });
        });
    });
});

function getPairs(cards) {
    let cardPairs = {};

    cards.each((i, card) => {
        const cardClass = card.classList[1];
        const exists = cardPairs[cardClass];
        if (exists) {
            cardPairs[cardClass].push(card);
        } else {
            cardPairs[cardClass] = [card];
        }
    });
    return cardPairs;
}
