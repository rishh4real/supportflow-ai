# SupportFlow AI

![SupportFlow AI logo](assets/logo.svg)

Milestone 2 implementation for a capstone project. It includes the core support agents, FAQ lookup, webhook intake, and a basic orchestration flow.

## Repository Name

Recommended GitHub repository name:

```text
supportflow-ai
```

## What Is Included

- Intake classifier agent for topic and urgency detection.
- FAQ responder agent with a small knowledge base.
- Sentiment analyzer agent for negative customer mood detection.
- Escalation handler for human-in-the-loop support tickets.
- Webhook API for receiving support queries.
- Tests for answered, escalated, and rejected cases.
- Milestone documentation in `docs/milestone-2.md`.
- n8n workflow template in `docs/n8n-workflow-template.json`.

## Run

```bash
npm test
npm start
```

Server URL:

```text
http://localhost:3000
```

Health check:

```bash
curl http://localhost:3000/health
```

Support webhook:

```bash
curl -X POST http://localhost:3000/webhook/support \
  -H "Content-Type: application/json" \
  -d '{"customer":{"name":"Asha","email":"asha@example.com"},"message":"How do I request a refund for a charged invoice?"}'
```

Urgent escalation demo:

```bash
curl -X POST http://localhost:3000/webhook/support \
  -H "Content-Type: application/json" \
  -d '{"customer":{"name":"Raj","email":"raj@example.com"},"message":"I am angry and frustrated. My account is blocked and this is urgent."}'
```

## Project Structure

```text
src/
  agents/
    escalationHandler.js
    faqResponder.js
    intakeClassifier.js
    sentimentAnalyzer.js
  data/
    faqKnowledgeBase.js
  orchestrator/
    supportOrchestrator.js
  server.js
test/
  orchestrator.test.js
docs/
  milestone-2.md
  n8n-workflow-template.json
  submission-summary.md
```

## Milestone 2 Checklist

- Core agents built.
- FAQ knowledge base lookup implemented.
- Webhook integration set up.
- Basic classifier to FAQ responder orchestration implemented.
- Human handoff path included for unresolved, urgent, or negative cases.
