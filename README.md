# Voyage E2E

This repository will hold a proposed, updated plan for running end-to-end acceptance tests against the Voyage SMS platform.

## Acceptance Tests

There are good reasons for having _acceptance_ tests -- as opposed to unit or integration tests -- distinct from the application repository. Since these are acceptance tests, it's important that there's no temptation, much less ability, to call into application code or utilize aspects of configurations that are part of the application itself. Users won't have access to any of that and acceptance tests are about testing how users will actually use the application.

This isn't to say that acceptance tests can't utilize resources that are "behind the scenes," such as an API or a database.

## Repo Focus

The initial focus of this repo will be the following:

* Replicate some aspects of the `Voyage.AutomationTests` logic from the `voyage` app repo.
* Implement some of the proposed new standards for test expression and construction.
* No strict PR or merge procedures initially.

As quickly as is responsible, the plan for this repo is then:

* Add segements automation.
* Start adding in PR or merge procedures (that we currently use).
* Add this repos tests to the execution pipline (with the understanding we may have two test pipelines).

As a note on styling, the `prettier` styling is a bit different here than that which is set up in the current automation. The focus is on keeping the defaults when it makes sense. Those defaults also provide much better extensibility in terms of other test solutions or plugins that we might want to adopt.

There is a `DEVNOTES.md` that will talk about some design and development aspects of this repo.
