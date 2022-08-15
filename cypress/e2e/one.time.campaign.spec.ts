import TenantDashboardPage from "../pages/TenantDashboardPage";

describe("One-Time Campaign", () => {
  let date: Date;
  let title: string;
  let tenantDashboard: TenantDashboardPage;

  const config = Cypress.env()[Cypress.env().ENVIRONMENT];
  const base_url = config.clientBaseURL;

  before(() => {
    cy.login("tenant");
    cy.visit(base_url);

    date = new Date();

    title = `OneTime Campaign Test - " ${date.toDateString()} ${date.toLocaleTimeString()}`;
  });

  beforeEach(() => {
    tenantDashboard = new TenantDashboardPage();
  });

  describe("workflow", () => {
    it("allows for creating a campaign", () => {
      //tenantDashboard.
    });
  });
});
