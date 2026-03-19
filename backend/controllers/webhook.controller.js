const prisma = require('../utils/prisma');
const aiService = require('../services/ai.service');

const webhookController = {
  handleIncoming: async (req, res) => {
    try {
      // Evolution API webhook payload format
      const { data } = req.body;
      if (!data || !data.message) return res.sendStatus(200);

      const phone = data.key.remoteJid.split('@')[0];
      const text = data.message.conversation || data.message.extendedTextMessage?.text || "";

      if (!text) return res.sendStatus(200);

      console.log(`[Webhook] Message from ${phone}: ${text}`);

      // 1. Identify patient
      const patient = await prisma.patient.findUnique({
        where: { phone },
        include: { diseaseFlow: true }
      });

      if (!patient) return res.sendStatus(200);

      // 2. Store conversation
      await prisma.conversation.create({
        data: {
          patientId: patient.id,
          message: text,
          role: 'PATIENT'
        }
      });

      // 3. Evaluate response with AI
      const evaluation = await aiService.classifyResponse(text);
      console.log(`[AI] Evaluation for ${patient.name}:`, evaluation);

      // 4. Handle Alert if needed
      if (evaluation.action === 'ALERT') {
        await prisma.alert.create({
          data: {
            patientId: patient.id,
            reason: evaluation.reason + ": " + text,
            type: evaluation.severity,
            status: 'OPEN'
          }
        });
        console.log(`[Alert] High priority alert created for ${patient.name}`);
      }

      // 5. Update Follow-up Log (Mark as responded)
      const lastLog = await prisma.followUpLog.findFirst({
        where: { patientId: patient.id, status: 'SENT' },
        orderBy: { createdAt: 'desc' }
      });

      if (lastLog) {
        await prisma.followUpLog.update({
          where: { id: lastLog.id },
          data: { 
            responseReceived: text,
            status: 'RESPONDED'
          }
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('[Webhook] Error handling message:', error.message);
      res.sendStatus(500);
    }
  }
};

module.exports = webhookController;
