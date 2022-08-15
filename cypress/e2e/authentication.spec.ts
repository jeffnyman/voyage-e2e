import LoginPage from "../pages/LoginPage";
import RecoveryPage from "../pages/RecoveryPage";

describe("Authentication", () => {
  const config = Cypress.env()[Cypress.env().ENVIRONMENT];
  let loginPage: LoginPage;
  let recoveryPage: RecoveryPage;

  beforeEach(() => {
    cy.logout();
    cy.visit(config.clientBaseURL);

    loginPage = new LoginPage();
  });

  it("allows logging in as a super admin", () => {
    loginPage.authenticate_as("admin");

    cy.verify_admin_login();
  });

  it("allows logging in as a tenant", () => {
    loginPage.authenticate_as("tenant");

    cy.verify_test_tenant_login();
  });

  describe("error conditions", () => {
    it("provides a message when user name is missing", () => {
      loginPage.login_with_no_credentials();
      loginPage.verify_username_required_message();
    });

    it("provides a message when password is missing", () => {
      loginPage.login_with_just_username();
      loginPage.verify_password_required_message();
    });
  });

  describe("handling forgotten credentials", () => {
    beforeEach(() => {
      cy.attempt_forgotten_password();

      recoveryPage = new RecoveryPage();
    });

    it("allows getting a recovery code", () => {
      recoveryPage.submit_forgotten_password_for_tenant();
      recoveryPage.verify_recovery_code_sent_message();
    });

    describe("error conditions", () => {
      it("provides a message when account information is not provided", () => {
        recoveryPage.submit_forgotten_password_with_no_account();
        recoveryPage.verify_email_required_message();
      });

      it("provides a message when account information is invalid", () => {
        recoveryPage.submit_forgotten_password_with_invalid_account();
        recoveryPage.verify_email_is_not_recognized_message();
      });

      it("provides a message when no recovery code is provided", () => {
        recoveryPage.submit_forgotten_password_for_tenant();
        recoveryPage.submit_with_missing_recovery_code();
        recoveryPage.verify_recovery_code_missing_message();
      });
    });
  });
});
