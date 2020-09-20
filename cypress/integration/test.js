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
            cy.get('.cardContainer').then((card) => {
                let originalClasses = [];
                card.each(function (i, card) {
                    originalClasses.push(card.className);
                });

                cy.visit(URL);

                cy.get('.button').click();

                let newClasses = [];
                cy.get('.cardContainer').then((newCards) => {
                    newCards.each(function (i, card) {
                        newClasses.push(card.className);
                    });

                    cy.wrap(originalClasses).should(
                        'not.deep.equal',
                        newClasses
                    );
                });
            });
        });
        asd;
    });
});
