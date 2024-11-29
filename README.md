# Open Library Cypress Automation Tests

This repository contains the Cypress automation tests for the Open Library application. The tests are written using Cucumber (Gherkin) syntax for behavior-driven development (BDD). This README file provides the necessary steps to run the project seamlessly on any host machine.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git** (for cloning the repository)

You can check the installed versions by running:

```bash
node -v
npm -v
git --version


1 - Clone the repository to your local machine

#Install the necessary project dependencies using npm:

- npm install


Configuration
Cypress Configuration
You may need to configure Cypress to suit your environment. The default configuration should work for most cases, but you can adjust it as needed in the cypress.json file.

Fixtures
Ensure that you have all necessary fixtures (e.g., authorSite.json, localization.json) in the cypress/fixtures folder. These files are required to map the author’s websites and localization strings for the tests.

If needed, update the fixture files based on your project’s requirements.



#Running Tests Locally
To run the tests locally in the interactive Cypress test runner, use the following command:

- npx cypress open

This will open the Cypress test runner, where you can select and run individual tests or all tests.

#Running Tests in Headless Mode (CI)
For Continuous Integration (CI) or when you prefer to run tests in the background, you can run Cypress in headless mode using:

- npx cypress run