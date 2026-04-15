function createEscalationTicket({ customer, message, classification, sentiment }) {
  const timestamp = new Date().toISOString();
  const ticketId = `ESC-${Date.now().toString(36).toUpperCase()}`;

  return {
    agent: "escalation-handler",
    ticketCreated: true,
    ticket: {
      id: ticketId,
      customer,
      topic: classification.topic,
      urgency: classification.urgency,
      sentiment: sentiment.label,
      status: "open",
      assignedTeam: classification.topic === "technical" ? "technical-support" : "customer-success",
      createdAt: timestamp,
      summary: message
    }
  };
}

module.exports = { createEscalationTicket };
