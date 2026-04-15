const { classifyIntake } = require("../agents/intakeClassifier");
const { findFaqAnswer } = require("../agents/faqResponder");
const { analyzeSentiment } = require("../agents/sentimentAnalyzer");
const { createEscalationTicket } = require("../agents/escalationHandler");

function orchestrateSupportQuery(payload) {
  const message = payload.message || payload.query || "";
  const customer = payload.customer || {
    name: payload.name || "Unknown customer",
    email: payload.email || "unknown@example.com"
  };

  if (!message.trim()) {
    return {
      status: "rejected",
      error: "Message is required for support orchestration."
    };
  }

  const classification = classifyIntake(message);
  const sentiment = analyzeSentiment(message);
  const faq = findFaqAnswer(message, classification.topic);
  const shouldEscalate = classification.urgency === "high" || sentiment.flags.highlyNegative || !faq.matched;
  const escalation = shouldEscalate
    ? createEscalationTicket({ customer, message, classification, sentiment })
    : null;

  return {
    status: shouldEscalate ? "escalated" : "answered",
    customer,
    message,
    routingPath: shouldEscalate
      ? ["webhook", "intake-classifier", "sentiment-analyzer", "faq-responder", "escalation-handler"]
      : ["webhook", "intake-classifier", "sentiment-analyzer", "faq-responder"],
    classification,
    sentiment,
    faq,
    escalation,
    finalResponse: shouldEscalate
      ? `${faq.response} A human support specialist has been assigned to ticket ${escalation.ticket.id}.`
      : faq.response
  };
}

module.exports = { orchestrateSupportQuery };
