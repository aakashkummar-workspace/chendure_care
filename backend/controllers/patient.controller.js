const prisma = require('../utils/prisma');
const whatsappService = require('../services/whatsapp.service');

const patientController = {
  createPatient: async (req, res) => {
    try {
      const { name, phone, diseaseType, doctorId, flowId } = req.body;
      
      const patient = await prisma.patient.create({
        data: {
          name,
          phone,
          diseaseType,
          doctorId,
          flowId,
          status: 'ACTIVE',
          currentDay: 0
        }
      });

      // Send welcome message
      await whatsappService.sendMessage(phone, `Welcome to Chendure CARE+, ${name}. We will be checking in on you daily regarding your ${diseaseType} care.`);

      res.status(201).json(patient);
    } catch (error) {
      console.error('[Patient] Error creating patient:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  getPatients: async (req, res) => {
    try {
      const patients = await prisma.patient.findMany({
        include: { doctor: true, diseaseFlow: true }
      });
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPatientById: async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await prisma.patient.findUnique({
        where: { id },
        include: { 
          doctor: true, 
          diseaseFlow: true, 
          logs: { orderBy: { createdAt: 'desc' } },
          conversations: { orderBy: { createdAt: 'desc' } },
          alerts: { orderBy: { createdAt: 'desc' } },
          documents: true
        }
      });
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = patientController;
