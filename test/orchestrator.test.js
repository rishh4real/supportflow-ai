const test = require("node:test");
const assert = require("node:assert/strict");
const { orchestrateSupportQuery } = require("../src/orchestrator/supportOrchestrator");

test("answers a known billing FAQ without escalation", () => {
  const result = orchestrateSupportQuery({
    customer: { name: "Asha", email: "asha@example.com" },
    message: "How do I request a refund for a charged invoice?"
  });

  assert.equal(result.status, "answered");
  assert.equal(result.classification.topic, "billing");
  assert.equal(result.faq.matched, true);
  assert.equal(result.escalation, null);
});

test("escalates urgent or highly negative support queries", () => {
  const result = orchestrateSupportQuery({
    customer: { name: "Raj", email: "raj@example.com" },
    message: "I am angry and frustrated. My account is blocked and this is urgent."
  });

  assert.equal(result.status, "escalated");
  assert.equal(result.classification.urgency, "high");
  assert.equal(result.sentiment.label, "negative");
  assert.equal(result.escalation.ticket.status, "open");
});

test("rejects empty messages", () => {
  const result = orchestrateSupportQuery({ message: "" });

  assert.equal(result.status, "rejected");
  assert.match(result.error, /Message is required/);
});
