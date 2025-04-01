describe("Campaigns", () => {
  before(() => {
    cy.resetDatabase();
  });

  beforeEach(() => {
    cy.login();
  });

  it("Should create a new campaign", () => {
    cy.visit("/projects/project1");
    cy.wait(500);
    cy.get("button").contains("Add Campaign").click();
    cy.get('section[role="dialog"]').within(() => {
      cy.contains("New Campaign");
      cy.get('input[name="title"]').type("Campaign 1");
      cy.get('textarea[name="description"]').type("Campaign 1 description");
      cy.get("button").contains("Add Campaign").click();
    });
    cy.get('table[aria-label="Campaigns').within(() => {
      cy.contains("Campaign 1");
      cy.contains("Campaign 1 description");
      cy.get("tr").contains("Campaign 1").click();
    });
    cy.url().should("include", "/projects/project1/campaigns");
    cy.contains("Campaign 1");
    cy.contains("Campaign 1 description");
  });

  it("Should edit a campaign", () => {
    cy.visit("/projects/project1");
    cy.get('table[aria-label="Campaigns').within(() => {
      cy.get("tr").contains("Campaign 1").click();
    });
    cy.contains("New Campaign Title").should("not.exist");
    cy.contains("New Campaign description").should("not.exist");
    cy.get('svg[data-icon="ellipsis-vertical').parent().click();
    cy.get('li[role="menuitem"]').contains("Edit").click();
    cy.get('input[name="title').clear().type("New Campaign Title");
    cy.get('textarea[name="description"]')
      .clear()
      .type("New Campaign description");
    cy.get("button").contains("Save").click();
    cy.contains("Campaign 1").should("not.exist");
    cy.contains("Campaign 1 description").should("not.exist");
    cy.contains("New Campaign Title");
    cy.contains("New Campaign description");
  });

  it("Should delete a campaign", () => {
    cy.visit("/projects/project1");
    cy.get('table[aria-label="Campaigns').within(() => {
      cy.get("tr").contains("New Campaign Title").click();
    });
    cy.get('svg[data-icon="ellipsis-vertical').parent().click();
    cy.get('li[role="menuitem"]').contains("Delete").click();
    cy.get('section[role="dialog"]').within(() => {
      cy.contains("Delete Campaign");
      cy.get("button").contains("Yes, Delete").click();
    });
    cy.url().should("not.include", "projects/project1/campaigns");
    cy.url().should("include", "/projects/project1");
    cy.contains("No campaigns. Please create one to get started!");
  });

  it("Should try visit a non-existant campaign", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on("fail", (_err) => {
      return;
    });

    cy.visit("/projects/project1/campaigns/fakeCampaign");
    cy.contains("Campaign not found.");
  });
});
