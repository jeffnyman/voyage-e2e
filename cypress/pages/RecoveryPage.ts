const config = Cypress.env()[Cypress.env().ENVIRONMENT];
const { tenantDetails } = config;

class RecoveryPage {
  constructor() {
    cy.get("input[placeholder='Email or username']").as("email");
    cy.get("input[name='email']").as("email");
    cy.get("button").contains("Submit").as("submit");
  }

  submit_forgotten_password_for_tenant() {
    cy.get("@email").should("exist").and("be.visible").type(tenantDetails.email);
    cy.get("@submit").click();
  }

  submit_forgotten_password_with_no_account() {
    cy.get("@submit").click();
  }

  submit_forgotten_password_with_invalid_account() {
    cy.get("@email").should("exist").and("be.visible").type("invalid@example.com");
    cy.get("@submit").click();
  }

  submit_with_missing_recovery_code() {
    cy.get("input[name='code']").clear();
    cy.get("@submit").click();
  }

  verify_recovery_code_sent_message() {
    cy.get('input[placeholder="Recovery Code"]').should("exist").and("be.visible");
    cy.get("#client-snackbar").should("have.text", "Recovery code has been sent to your email");
  }

  verify_email_required_message() {
    cy.get("div").contains("The email field is required.").should("be.visible");
  }

  verify_email_is_not_recognized_message() {
    cy.get("div").contains("Email is incorrect").should("be.visible");
  }

  verify_recovery_code_missing_message() {
    cy.get("div").contains("The recovery code field is required.").should("be.visible");
  }
}

export default RecoveryPage;
