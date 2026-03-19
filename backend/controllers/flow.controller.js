const prisma = require('../utils/prisma');

const flowController = {
  createFlow: async (req, res) => {
    try {
      const { name, steps } = req.body;
      const flow = await prisma.diseaseFlow.create({
        data: {
          name,
          steps: {
            create: steps // Expects array of { dayNumber, messageTemplate, actionType }
          }
        },
        include: { steps: true }
      });
      res.status(201).json(flow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFlows: async (req, res) => {
    try {
      const flows = await prisma.diseaseFlow.findMany({
        include: { steps: true }
      });
      res.json(flows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = flowController;
