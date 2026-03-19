const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('node-cron');
const dotenv = require('dotenv');
const automationEngine = require('./services/automation.engine');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes (to be implemented)
app.use('/patients', require('./routes/patient.routes'));
app.use('/doctors', require('./routes/doctor.routes'));
app.use('/flows', require('./routes/flow.routes'));
app.use('/alerts', require('./routes/alert.routes'));
app.use('/webhook', require('./routes/webhook.routes'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Schedule Cron (Daily at 9 AM)
cron.schedule('0 9 * * *', () => {
  console.log('[Cron] Running daily follow-up automation...');
  automationEngine.runDailyFollowUps();
});

// Manual trigger for testing
app.post('/followup/run', async (req, res) => {
  await automationEngine.runDailyFollowUps();
  res.json({ message: 'Automation triggered manually' });
});

app.listen(PORT, () => {
  console.log(`[Server] Chendure CARE+ Backend running on port ${PORT}`);
});
