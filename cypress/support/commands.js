Cypress.on('uncaught:exception', (err, runnable) => {
    // Print the error to the console for debugging
    console.error('Uncaught exception:', err);

    // Returning false prevents Cypress from failing the test
    return false;
});