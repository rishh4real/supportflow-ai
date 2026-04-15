const faqKnowledgeBase = [
  {
    id: "billing-refund",
    topic: "billing",
    question: "How do I request a refund?",
    keywords: ["refund", "charged", "charge", "payment", "invoice", "billing", "money"],
    answer:
      "I can help with billing. Please share your order ID and the charge date. If the payment is eligible, our billing team will process the refund or explain the next step."
  },
  {
    id: "billing-plan",
    topic: "billing",
    question: "How can I change my subscription plan?",
    keywords: ["subscription", "plan", "upgrade", "downgrade", "cancel", "renewal"],
    answer:
      "You can manage your subscription from Account Settings > Billing. If the option is unavailable, send us the account email and desired plan change."
  },
  {
    id: "technical-login",
    topic: "technical",
    question: "I cannot log in.",
    keywords: ["login", "password", "signin", "sign in", "otp", "authentication", "account locked"],
    answer:
      "Try resetting your password, clearing browser cache, and signing in again. If OTP is not arriving, confirm your registered email or phone number and we will investigate."
  },
  {
    id: "technical-bug",
    topic: "technical",
    question: "The product is not working correctly.",
    keywords: ["bug", "error", "crash", "broken", "not working", "failed", "issue"],
    answer:
      "Please send the error message, device/browser details, and the steps that caused the issue. Our technical support team can reproduce and resolve it faster with those details."
  },
  {
    id: "general-hours",
    topic: "general",
    question: "What are support hours?",
    keywords: ["hours", "availability", "contact", "support time", "working hours"],
    answer:
      "Support is available Monday to Friday, 9 AM to 6 PM. Urgent escalations are monitored outside business hours."
  },
  {
    id: "general-shipping",
    topic: "general",
    question: "Where is my order?",
    keywords: ["shipping", "delivery", "order status", "tracking", "delivered"],
    answer:
      "Share your order ID and registered email. We will check the latest tracking status and update you with the expected delivery date."
  }
];

module.exports = { faqKnowledgeBase };
