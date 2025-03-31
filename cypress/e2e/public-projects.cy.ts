describe("Public Projects", () => {
  before(() => {
    cy.resetDatabase();
  });

  it("Should create a public project", () => {
    cy.login();
    cy.visit("/projects/new");
    cy.get('input[name="title"]').type("Public Project");
    cy.get('textarea[name="description"]').type("Public Project description");
    cy.get('input[aria-label="Public Project?"]').check();
    cy.get("button").contains("Add Project").click();
    cy.contains("Public Project");
    cy.get("span").contains("Public");
  });

  it("Should visit a public project", () => {
    cy.visit("/projects/project4");
    cy.contains("Project 4");
    cy.contains("Public project");
    cy.get("button").contains("Add Campaign").should("not.exist");
  });

  it("Should visit a public campaign", () => {
    cy.visit("/projects/project4/campaigns/project4Campaign1");
    cy.contains("Project 4 Campaign");
    cy.get("a").contains("manage invitations").should("not.exist");
  });

  it("Should try view invitations for a public campaign", () => {
    cy.visit("/projects/project4/campaigns/project4Campaign1/invitations");
    cy.contains("You do not have access to this.");
  });
});
