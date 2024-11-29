import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

When('I look up a book titled {string}', (bookTitled) => {
  // Build the search URL with the book title (no author name needed)
  const urlSearch = `https://openlibrary.org/search.json?q=${bookTitled}`;

  // Fetch the book details
  cy.request(urlSearch).then((bookResponse) => {
    expect(bookResponse.status).to.eq(200);

    // Extract the author_key from the first book in the result
    const firstResult = bookResponse.body.docs[0];
    const authorKey = firstResult?.author_key ? firstResult.author_key[0] : null;

    // Validate author_key exists
    expect(authorKey).to.not.be.null;
    cy.log('Author Key:', authorKey);

    // Extract the author's name from the search result
    const authorName = firstResult?.author_name ? firstResult.author_name[0] : '';
    const normalizedAuthorName = authorName.toLowerCase();  // Normalize to lowercase

    // Log the normalized author name for debugging
    cy.log('Normalized Author Name:', normalizedAuthorName);

    // Load the mapping from fixtures (update the filename to authorSite.json)
    cy.fixture('authorSite').then((authorSites) => {
      // Log the contents of the authorSites mapping
      cy.log('Author Sites Mapping:', authorSites);

      // Step 2: Use the author_key to fetch author details from /authors/{author_key}.json
      const authorUrl = `https://openlibrary.org/authors/${authorKey}.json`;
      cy.request(authorUrl).then((authorResponse) => {
        expect(authorResponse.status).to.eq(200);

        // Log the author details for inspection
        const authorDetails = authorResponse.body;
        cy.log('Author Details:', authorDetails);

        // Save authorDetails to a Cypress alias for later use
        cy.wrap(authorResponse.body).as('authorDetails');

        // Retrieve the expected website URL for the author from the loaded mapping
        const expectedWebsite = authorSites[normalizedAuthorName] || ''; // Default to empty if no match

        // Log the expected website for debugging
        cy.log('Expected Website:', expectedWebsite);

        // Save the expected website URL to a Cypress alias for later use
        cy.wrap(expectedWebsite).as('expectedWebsite');
      });
    });
  });
});

Then('I validate the author\'s website', () => {
  cy.get('@authorDetails').then((authorDetails) => {
    // Retrieve the expected website URL for the author
    cy.get('@expectedWebsite').then((expectedWebsite) => {
      // Validate the website is correctly shown
      expect(authorDetails?.links?.[0]?.url).to.eq(expectedWebsite);
      cy.log('Website is correctly shown as:', authorDetails.links[0].url);
    });
  });
});
