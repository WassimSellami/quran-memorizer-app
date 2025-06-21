import express from 'express';
import cors from 'cors';
import gptRoutes from './routes/gptRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import cron from 'node-cron';
import { emailService } from './services/emailService.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/gpt', gptRoutes);
app.use('/api/email', emailRoutes);

cron.schedule('*/20 * * * * *', () => {
    console.log('Sending reminder every 20 seconds...');
    emailService.sendReminders('2025-07-14');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
