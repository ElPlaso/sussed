describe("Sus Responses", () => {
  before(() => {
    cy.resetDatabase();
  });

  it("Should check the status of an invitation before a response has been submitted", () => {
    cy.login();
    cy.visit("/projects/project3/campaigns/project3Campaign1/invitations");
    cy.get('table[aria-label="Sus Invitations"]').within(() => {
      cy.get('td[data-key="project3Campaign1Invitation1.0"]').contains(
        "project3Campaign1Invitation1"
      );
      cy.get('td[data-key="project3Campaign1Invitation1.2"]').within(() => {
        cy.get('input[type="checkbox"][aria-label="pending"]').should("exist");
      });
    });
  });

  it("Should submit a sus response", () => {
    cy.visit(
      "projects/project3/campaigns/project3Campaign1/sus?invite-code=project3Campaign1Invitation1"
    );
    cy.contains("Project 3");
    cy.contains("System Usability Scale Questionnaire (SUS)");
    cy.get("span")
      .contains("1:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="FIVE"]').check();
      });
    cy.get("span")
      .contains("2:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="ONE"]').check();
      });
    cy.get("span")
      .contains("3:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="FIVE"]').check();
      });
    cy.get("span")
      .contains("4:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="ONE"]').check();
      });
    cy.get("span")
      .contains("5:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="FIVE"]').check();
      });
    cy.get("span")
      .contains("6:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="ONE"]').check();
      });
    cy.get("span")
      .contains("7:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="FIVE"]').check();
      });
    cy.get("span")
      .contains("8:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="ONE"]').check();
      });
    cy.get("span")
      .contains("9:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="FIVE"]').check();
      });
    cy.get("span")
      .contains("10:")
      .parent()
      .within(() => {
        cy.get('input[type="radio"][value="ONE"]').check();
      });
    cy.get("button").contains("Submit").click();
    cy.url().should(
      "include",
      "projects/project3/campaigns/project3Campaign1/sus/success?invite-code=project3Campaign1Invitation1"
    );
    cy.contains("Thank you!");
    cy.contains('Your response for "Project 3" has been submitted.');
  });

  it("Should check a campaign's SUS score after a response has been submitted", () => {
    cy.login();
    cy.visit("projects/project3/campaigns/project3Campaign1");
    cy.contains("100");
    cy.contains("WOW! This SUS score is one of the best imaginable!");
  });

  it("Should check the status of an invitation after a response has been submitted", () => {
    cy.login();
    cy.visit("/projects/project3/campaigns/project3Campaign1/invitations");
    cy.get('table[aria-label="Sus Invitations"]').within(() => {
      cy.get('td[data-key="project3Campaign1Invitation1.0"]').contains(
        "project3Campaign1Invitation1"
      );
      cy.get('td[data-key="project3Campaign1Invitation1.2"]').within(() => {
        cy.get('input[type="checkbox"][aria-label="submitted"]').should(
          "exist"
        );
      });
    });
  });

  it("Should try to resubmit an already submmited sus response", () => {
    cy.visit(
      "projects/project3/campaigns/project3Campaign1/sus?invite-code=project3Campaign1Invitation1"
    );
    cy.contains(
      "A response with this invitation code has already been submitted for this project."
    );
  });
});
