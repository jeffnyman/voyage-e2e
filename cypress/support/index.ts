import "./authentication";

Cypress.on("uncaught:exception", (err) => {
  return false;
});
