# Capstone Submission Summary

Project name: Agentic Customer Support System

## Milestone 2 Deliverables

1. Built an intake classifier agent that detects query topic and urgency.
2. Built an FAQ responder agent with a local knowledge base lookup.
3. Added webhook integration for receiving support tickets.
4. Connected classifier, sentiment analyzer, FAQ responder, and escalation handler through a basic orchestrator.
5. Added human handoff for high urgency, highly negative, or unresolved queries.
6. Added tests and runnable demo commands.
7. Added an n8n workflow template that mirrors the implemented agent orchestration.

## Demo Script

1. Run `npm test` to show the core workflow tests passing.
2. Run `npm start` to start the webhook API.
3. Send the sample billing webhook request from `README.md`.
4. Show that the response includes topic classification, urgency, sentiment, FAQ match, routing path, and final response.
5. Send the urgent escalation request from `README.md`.
6. Show that a human handoff ticket is created.

## Evidence

- Source code is in `src/`.
- Tests are in `test/orchestrator.test.js`.
- Milestone documentation is in `docs/milestone-2.md`.
- n8n template is in `docs/n8n-workflow-template.json`.
