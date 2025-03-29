export {};

declare global {
  namespace Cypress {
    interface Chainable {
      resetDatabase(): Chainable<void>;
      login(): Chainable<void>;
    }
  }
}
