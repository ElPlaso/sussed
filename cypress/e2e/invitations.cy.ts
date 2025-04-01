describe("Invitations", () => {
  before(() => {
    cy.resetDatabase();
  });

  beforeEach(() => {
    cy.login();
  });

  it("Should navigate to the invitations page", () => {
    cy.visit("projects/project2/campaigns/project2Campaign1");
    cy.get("a").contains("manage invitations").click();
    cy.url().should(
      "include",
      "/projects/project2/campaigns/project2Campaign1/invitations"
    );
    cy.wait(500);
    cy.contains("Invitations");
  });

  it("Should create a new invitation", () => {
    cy.visit("/projects/project2/campaigns/project2Campaign1/invitations");
    cy.contains("No invitations yet.");
    cy.get("button").contains("Add New Invitation").click();
    cy.contains("No invitations yet").should("not.exist");
  });

  it("Should delete an invitation", () => {
    cy.visit("/projects/project2/campaigns/project2Campaign1/invitations");
    cy.contains("No invitations yet").should("not.exist");
    cy.get('table[aria-label="Sus Invitations"]').within(() => {
      cy.get('svg[data-icon="trash"]').parent().click();
    });
    cy.get('section[role="dialog"]').within(() => {
      cy.contains("Delete Invitation");
      cy.get("button").contains("Yes, Delete").click();
    });
    cy.contains("No invitations yet");
  });
});
