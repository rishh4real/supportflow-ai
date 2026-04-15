const NEGATIVE_WORDS = ["angry", "bad", "terrible", "hate", "frustrated", "upset", "annoyed", "worst", "fraud"];
const POSITIVE_WORDS = ["thanks", "thank you", "great", "good", "helpful", "love", "appreciate"];

function analyzeSentiment(message) {
  const text = String(message || "").toLowerCase();
  const negativeScore = NEGATIVE_WORDS.filter((word) => text.includes(word)).length;
  const positiveScore = POSITIVE_WORDS.filter((word) => text.includes(word)).length;
  const score = positiveScore - negativeScore;
  const label = score < 0 ? "negative" : score > 0 ? "positive" : "neutral";

  return {
    agent: "sentiment-analyzer",
    label,
    score,
    flags: {
      highlyNegative: negativeScore >= 2 || text.includes("lawsuit") || text.includes("fraud")
    }
  };
}

module.exports = { analyzeSentiment };
