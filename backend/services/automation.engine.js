const prisma = require('../utils/prisma');
const whatsappService = require('./whatsapp.service');

const automationEngine = {
  runDailyFollowUps: async () => {
    console.log('[Automation] Starting daily follow-ups...');
    
    try {
      const activePatients = await prisma.patient.findMany({
        where: { status: 'ACTIVE' },
        include: { diseaseFlow: { include: { steps: true } } }
      });

      for (const patient of activePatients) {
        if (!patient.diseaseFlow) continue;

        const nextDay = patient.currentDay + 1;
        const currentStep = patient.diseaseFlow.steps.find(s => s.dayNumber === nextDay);

        if (currentStep) {
          console.log(`[Automation] Sending follow-up to ${patient.name} (Day ${nextDay})`);
          
          let response;
          if (currentStep.actionType === 'QUESTION') {
            response = await whatsappService.sendButtons(patient.phone, currentStep.messageTemplate, ['Better', 'Same', 'Worse']);
          } else {
            response = await whatsappService.sendMessage(patient.phone, currentStep.messageTemplate);
          }

          if (response) {
            // Log the follow-up
            await prisma.followUpLog.create({
              data: {
                patientId: patient.id,
                stepId: currentStep.id,
                dayNumber: nextDay,
                messageSent: currentStep.messageTemplate,
                status: 'SENT'
              }
            });

            // Update patient current day
            await prisma.patient.update({
              where: { id: patient.id },
              data: { 
                currentDay: nextDay,
                lastFollowUp: new Date()
              }
            });
          }
        } else {
          // No more steps for this flow?
          // Check if patient has completed the flow (max day reached)
          const maxDay = Math.max(...patient.diseaseFlow.steps.map(s => s.dayNumber));
          if (nextDay > maxDay) {
            console.log(`[Automation] Patient ${patient.name} has completed the flow.`);
            await prisma.patient.update({
              where: { id: patient.id },
              data: { status: 'COMPLETED' }
            });
          }
        }
      }
    } catch (error) {
      console.error('[Automation] Error running follow-ups:', error.message);
    }
  }
};

module.exports = automationEngine;
