describe("Projects", () => {
  before(() => {
    cy.resetDatabase();
  });

  beforeEach(() => {
    cy.login();
  });

  it("Should navigate to a project", () => {
    cy.visit("/");
    cy.get("button").contains("Project 1").click();
    cy.url().should("include", "/projects/project1");
  });
});

describe("Permissions", () => {
  before(() => {
    cy.resetDatabase();
  });

  it("Should visit non-owned private project", () => {
    cy.visit("/projects/project1");
    cy.contains("You do not have access to this project.");
  });
});
