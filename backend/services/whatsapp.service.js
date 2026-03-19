const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_URL = process.env.EVOLUTION_API_URL;
const API_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE = process.env.EVOLUTION_INSTANCE_NAME;

const whatsappService = {
  sendMessage: async (phone, message) => {
    try {
      console.log(`[WhatsApp] Sending message to ${phone}: ${message}`);
      // Mock for now unless API is live
      if (!API_URL || !API_KEY) return { status: 'MOCK_SENT' };

      const response = await axios.post(`${API_URL}/message/sendText/${INSTANCE}`, {
        number: phone,
        text: message
      }, {
        headers: { apikey: API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('[WhatsApp] Error sending message:', error.message);
      return null;
    }
  },

  sendButtons: async (phone, question, options) => {
    try {
      console.log(`[WhatsApp] Sending buttons to ${phone}: ${question} - Options: ${options.join(', ')}`);
      if (!API_URL || !API_KEY) return { status: 'MOCK_SENT' };

      const buttons = options.map((opt, index) => ({
        buttonId: `id_${index}`,
        buttonText: { displayText: opt },
        type: 1
      }));

      const response = await axios.post(`${API_URL}/message/sendButtons/${INSTANCE}`, {
        number: phone,
        title: "Chendure CARE+",
        description: question,
        footer: "Please select an option",
        buttons: buttons
      }, {
        headers: { apikey: API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('[WhatsApp] Error sending buttons:', error.message);
      return null;
    }
  }
};

module.exports = whatsappService;
