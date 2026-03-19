const aiService = {
  classifyResponse: async (text) => {
    const lowerText = text.toLowerCase();
    
    // Simple rule-based classification as a mock AI
    if (lowerText.includes('worse') || lowerText.includes('pain') || lowerText.includes('bad') || lowerText.includes('severe')) {
      return { severity: 'HIGH', action: 'ALERT', reason: 'Negative symptoms detected' };
    }
    
    if (lowerText.includes('better') || lowerText.includes('good') || lowerText.includes('ok')) {
      return { severity: 'LOW', action: 'NONE', reason: 'Positive response' };
    }

    return { severity: 'MEDIUM', action: 'NONE', reason: 'Neutral response' };
  }
};

module.exports = aiService;
