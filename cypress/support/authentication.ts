import { Session } from "./session";

declare global {
  namespace Cypress {
    interface Chainable {
      login(userType: "tenant"): Chainable<any>;
      logout(): Chainable<any>;
      verify_admin_login(): Chainable<Element>;
      verify_test_tenant_login(): Chainable<Element>;
      attempt_forgotten_password(): Chainable<Element>;
    }
  }
}

export const login = (user_type: "tenant") => {
  // const envirionment = Cypress.env()[Cypress.env().ENVIRONMENT];
  const config = Cypress.env()[Cypress.env().ENVIRONMENT];

  // const { appLogin, apiBaseUrl } = envirionment;
  const { apiBaseURL, appCredentials } = config;

  // const { user: username, password } = appLogin[userType];
  const { user: username, password } = appCredentials[user_type];

  // const { testTenant } = envirionment;
  const { tenantDetails } = config;

  const tokens_path = "cypress/fixtures/tokens.json";
  const session_path = "cypress/fixtures/session.json";
  const url = `${apiBaseURL}/api/user/authenticate`;

  return cy
    .request({
      method: "POST",
      url,
      headers: {
        Content: "application/json",
        Accept: "*/*",
      },
      body: {
        mode: 1,
        username,
        password,
      },
    })
    .then((response) => {
      const session: Session = {
        isAdmin: false,
        isImpersonated: false,
        isTenantAdmin: false,
        partnerName: "",
        passwordless: false,
        tenantId: tenantDetails.id,
        token: response.body.token,
        userId: response.body.id,
      };

      cy.writeFile(
        tokens_path,
        { tokens: { session: session.token }, tenant: session.token },
        { log: false }
      );

      cy.writeFile(session_path, session);

      return cy.window().then((window) => {
        window.sessionStorage.setItem("app_voyage", JSON.stringify(session));
        return session;
      });
    });
};

Cypress.Commands.add("login", login);

Cypress.Commands.add("logout", () => {
  window.sessionStorage.removeItem("app_voyage");
});

Cypress.Commands.add("verify_admin_login", () => {
  cy.get("[role='button']").contains("Super Admin").should("be.visible");
});

Cypress.Commands.add("verify_test_tenant_login", () => {
  cy.get("[role='button']").contains("Test Tenant").should("be.visible");
});

Cypress.Commands.add("attempt_forgotten_password", () => {
  cy.get("a").contains("Forgot password?").click();
});
