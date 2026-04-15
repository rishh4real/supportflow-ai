const TOPIC_RULES = {
  billing: ["billing", "refund", "invoice", "charged", "payment", "subscription", "plan", "cancel"],
  technical: ["login", "password", "error", "bug", "crash", "broken", "otp", "not working", "failed"],
  general: ["hours", "contact", "shipping", "delivery", "order", "tracking", "question", "information"]
};

const URGENCY_RULES = {
  high: ["angry", "urgent", "immediately", "asap", "lawsuit", "fraud", "security", "down", "blocked"],
  medium: ["soon", "today", "stuck", "cannot", "can't", "failed", "missing", "problem"],
  low: ["question", "wondering", "when", "how", "where", "info", "information"]
};

function normalizeText(text) {
  return String(text || "").toLowerCase();
}

function scoreByKeywords(text, rules) {
  return Object.entries(rules).map(([label, keywords]) => {
    const score = keywords.reduce((total, keyword) => {
      return text.includes(keyword) ? total + 1 : total;
    }, 0);

    return { label, score };
  });
}

function pickHighest(scored, fallback) {
  return scored.sort((a, b) => b.score - a.score)[0]?.score > 0
    ? scored.sort((a, b) => b.score - a.score)[0].label
    : fallback;
}

function classifyIntake(message) {
  const text = normalizeText(message);
  const topic = pickHighest(scoreByKeywords(text, TOPIC_RULES), "general");
  const urgency = pickHighest(scoreByKeywords(text, URGENCY_RULES), "low");

  return {
    agent: "intake-classifier",
    topic,
    urgency,
    confidence: estimateConfidence(text, topic, urgency)
  };
}

function estimateConfidence(text, topic, urgency) {
  const topicMatches = TOPIC_RULES[topic].filter((keyword) => text.includes(keyword)).length;
  const urgencyMatches = URGENCY_RULES[urgency].filter((keyword) => text.includes(keyword)).length;
  const rawScore = 0.45 + topicMatches * 0.15 + urgencyMatches * 0.1;

  return Number(Math.min(rawScore, 0.95).toFixed(2));
}

module.exports = { classifyIntake };
