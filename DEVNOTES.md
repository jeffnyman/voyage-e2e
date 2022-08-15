# BROAD DESIGN NOTES

- No tests should be described as "positive tests" or "negative tests."
- All tests are positive tests in the sense that they are designed to tell us if a feature matches expectations.
- Tests instead should be framed around valid and invalid conditions.


# INITIAL DESIGN NOTES

A `cypress.env.json` is used, which Cypress will automatically check for environment variables. Values in this file will overwrite any conflicting environment variables from the default configuration file (`cypress.json`).

What distinguishes a Cypress action from an action on a page definition?

Actions like `cy.logout()` are currenty a Cypress action.
This allows it to look more like a built in action, such as `cy.reload()`.

So why have `cy.login()` versus having an action on the LoginPage?

Currently the app action approach allows it to be used anywhere. That means the methods on the page object would only be called when the particular page in question is being tested.

But this can also be very confusing since you have to consider what to use where and when.

It's also going to be very important to decide on things like:

* Do we have multiple assertions but one core validation for any test?
* Do assertions/validations go in page objects or in the test itself?
* Do the tests form their own expressive API? (Which dictates how you name functions.)
* You should not have to read two or more files to figure out how a test is asserting/validating.
* Core data conditions should be exposed in the test itself or in the expressive function the test calls to.
