const prisma = require('../utils/prisma');

const doctorController = {
  createDoctor: async (req, res) => {
    try {
      const { name } = req.body;
      const doctor = await prisma.doctor.create({
        data: { name }
      });
      res.status(201).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDoctors: async (req, res) => {
    try {
      const doctors = await prisma.doctor.findMany();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = doctorController;
