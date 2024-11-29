import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

const url = "https://openlibrary.org";

beforeEach(() => {
  cy.visit(url);
});

Given('I search for the book titled {string}', (bookName) => {
  cy.get('input[name="q"]').type(bookName);
  cy.get('input[type="submit"]').first().click();
});

When('I click in the author\'s name {string}', (bookAuthor) => {
  cy.get('span.bookauthor').contains(bookAuthor).first().click();
});

And('I sort by rating', () => {
  //cy.wait(2000);
  cy.get('a')
      .contains('Top Rated')
      .click({ force: true });
});

Then('I validate the top-rated work is {string}', (fullBookName) => {
  cy.get('.results').first() // Replace with the actual selector for the top-rated book
      .should('contain.text', fullBookName);
});

Given('I change the language to {string}', (language) => {
  // Open the dropdown
  cy.get('.language-component.header-dropdown details summary').click();

  // Wait for the dropdown to become visible
  cy.get('.language-dropdown-component .locale-options')
      .should('be.visible');

    // Click the desired language option
  cy.get(`.language-dropdown-component .locale-options a[data-lang-id="${language}"]`).click();

  cy.fixture('localization').then((messages) => {
  // Log the contents of the authorSites mapping
  const expectedMessage = messages.welcome[language];

  // Save the expected website URL to a Cypress alias for later use
  cy.wrap(expectedMessage).as('expectedMessage');
});
});

Then('I see the page in the expected language', () => {
  cy.get('@expectedMessage').then((expectedMessage) => {
    // Validate the welcome message on the page
    cy.get('.home-h2') // Replace with the actual selector for the welcome message
        .should('contain.text', expectedMessage);
  });
});