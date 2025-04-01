// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

function loginViaPassword() {
  cy.visit("/");
  cy.get('input[type="password"]').type("password");
  cy.get('button[id="submitButton"]').click();
}

Cypress.Commands.add("resetDatabase", () => {
  cy.exec("npx prisma migrate reset --force");
});

Cypress.Commands.add("login", () => {
  cy.session(
    `Bob`,
    () => {
      const log = Cypress.log({
        displayName: "Sussed Development Login",
        message: [`🔐 Authenticating`],
        autoEnd: false,
      });

      log.snapshot("before");

      loginViaPassword();

      log.snapshot("after");
      log.end();
    },
    {
      validate: () => {
        cy.visit("/");
        cy.contains("Projects");
      },
    }
  );
});
