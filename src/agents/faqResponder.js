const { faqKnowledgeBase } = require("../data/faqKnowledgeBase");

function findFaqAnswer(message, topic) {
  const text = String(message || "").toLowerCase();
  const candidates = faqKnowledgeBase
    .filter((item) => item.topic === topic || topic === "general")
    .map((item) => ({
      ...item,
      score: item.keywords.reduce((total, keyword) => {
        return text.includes(keyword.toLowerCase()) ? total + 1 : total;
      }, 0)
    }))
    .sort((a, b) => b.score - a.score);

  const match = candidates.find((item) => item.score > 0);

  if (!match) {
    return {
      agent: "faq-responder",
      matched: false,
      response:
        "Thanks for reaching out. I could not find an exact FAQ match, so I am routing this to a support specialist with your original message."
    };
  }

  return {
    agent: "faq-responder",
    matched: true,
    faqId: match.id,
    question: match.question,
    response: match.answer
  };
}

module.exports = { findFaqAnswer };
