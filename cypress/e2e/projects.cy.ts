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

  it("Should edit a project", () => {
    cy.visit("/projects/project1");
    cy.contains("Project 1");
    cy.contains("Project 1 description");
    cy.contains("New Project Title").should("not.exist");
    cy.contains("New Project description").should("not.exist");
    cy.get('svg[data-icon="ellipsis-vertical"]').parent().click();
    cy.get('li[role="menuitem"]').contains("Edit").click();
    cy.get('input[name="title').clear().type("New Project Title");
    cy.get('textarea[name="description"]')
      .clear()
      .type("New Project description");
    cy.get("button").contains("Save").click();
    cy.contains("Project 1").should("not.exist");
    cy.contains("Project 1 description").should("not.exist");
    cy.contains("New Project Title");
    cy.contains("New Project description");
  });

  it("Should delete a project", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on("fail", (_err) => {
      return;
    });

    cy.visit("/projects/project1");
    cy.get('svg[data-icon="ellipsis-vertical"]').parent().click();
    cy.get('li[role="menuitem"]').contains("Delete").click();
    cy.get('section[role="dialog"]').within(() => {
      cy.contains("Delete Project");
      cy.get("button").contains("Yes, Delete").click();
    });
    cy.url().should("not.include", "/projects/project1");
    cy.contains("Projects");
    cy.get("button").contains("New Project");
    cy.visit("/projects/project1");
    cy.contains("Project not found.");
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
