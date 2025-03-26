describe('YouTube Cypress Test Suite', () => {
    beforeEach(() => {
        cy.setCookie('CONSENT', 'YES+1');
    });

    it('Check Youtube Logo', () => {
        cy.visit('https://www.youtube.com/');

        cy.get('ytd-masthead', { timeout: 15000 }).should('exist');
        cy.get('ytd-button-renderer').contains('Accept all').click({ force: true });
        cy.wait(5000);

        cy.get('a#logo')
            .filter(':visible')
            .should('have.length', 1)
            .click();

        cy.url().should('eq', 'https://www.youtube.com/');
    });

    it('Navigate to Trending from homepage and checks video titles', () => {
        cy.visit('https://www.youtube.com/');

        cy.get('ytd-button-renderer')
            .contains('Accept all')
            .click({ force: true })
            .should('not.exist');

        cy.get('button[aria-label="Guide"]').click({ force: true });

        cy.get('ytd-guide-entry-renderer')
            .contains(/Trending|Na czasie|Explore|Eksploruj/i)
            .click({ force: true });

        cy.url().should('include', '/feed/trending');

        cy.get('ytd-video-renderer', { timeout: 15000 }).should('exist');

        cy.get('ytd-video-renderer')
            .first()
            .find('#video-title')
            .should('have.attr', 'title')
            .and('not.be.empty');
    });
});
