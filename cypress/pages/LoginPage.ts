const config = Cypress.env()[Cypress.env().ENVIRONMENT];
const { appCredentials } = config;

class LoginPage {
  constructor() {
    cy.intercept("POST", "**/api/user/authenticate").as("loginResp");

    cy.get("input[name='username']").as("username");
    cy.get("input[name='password']").as("password");
    cy.get("button").contains("Sign In").should("be.visible").as("signIn");
  }

  authenticate_as(user_type: string) {
    const credentials = appCredentials[user_type];
    const path = "cypress/fixtures/tokens.json";

    cy.get("@username").should("be.visible").type(credentials.username);
    cy.get("@password").should("be.visible").type(credentials.password);
    cy.get("@signIn").click();

    cy.wait("@loginResp").then(({ response }) => {
      cy.writeFile(path, { tokens: { session: response.body.token } });
    });
  }

  login_with_just_username() {
    cy.get("@username").should("be.visible").type("user");
    cy.get("@password").should("be.visible").clear();
    cy.get("@signIn").click();
  }

  login_with_no_credentials() {
    cy.get("@username").should("be.visible").clear();
    cy.get("@password").should("be.visible").clear();
    cy.get("@signIn").click();
  }

  verify_username_required_message() {
    cy.get("div").contains("The username field is required.").should("be.visible");
  }

  verify_password_required_message() {
    cy.get("div").contains("The password field is required.").should("be.visible");
  }
}

export default LoginPage;
