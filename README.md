# Agentic Customer Support System

![Agentic Customer Support System logo](assets/logo.svg)



## Example Workflow

A customer submits a support query via webhook. The intake classifier detects topic and urgency, the sentiment analyzer scores the tone, and the FAQ responder attempts an instant answer from the knowledge base. If the case is unresolved, urgent, or highly negative, the escalation handler creates a human support ticket with context. The orchestrator coordinates the full pipeline end-to-end.

## Milestone 2 Features

- Intake classifier agent for query topic and urgency.
- FAQ responder agent with local knowledge base lookup.
- Escalation handler for human-in-the-loop support handoff.
- Sentiment analyzer for negative interaction detection.
- Agent orchestration layer for route coordination.
- Webhook support API for ticket intake.
- Conversation logging and structured workflow outputs.
- n8n-ready template at `docs/n8n-workflow-template.json`.

## Team

Team name: 69 bits

Team leader: Atulit Krishna

Members:
- Shaurya Sharma
- Rishi Sharma
- Tanush Gupta

## Run Locally

```bash
npm test
npm start
```

Base URL:

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
