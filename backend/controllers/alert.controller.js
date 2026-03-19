const prisma = require('../utils/prisma');

const alertController = {
  getAlerts: async (req, res) => {
    try {
      const alerts = await prisma.alert.findMany({
        where: { status: 'OPEN' },
        include: { patient: true }
      });
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  resolveAlert: async (req, res) => {
    try {
      const { id } = req.params;
      const alert = await prisma.alert.update({
        where: { id },
        data: { status: 'RESOLVED' }
      });
      res.json(alert);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = alertController;
