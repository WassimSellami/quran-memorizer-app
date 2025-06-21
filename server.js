import express from 'express';
import cors from 'cors';
import gptRoutes from './routes/gptRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import cron from 'node-cron';
import dayjs from 'dayjs';
import { emailService } from './services/emailService.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/gpt', gptRoutes);
app.use('/api/email', emailRoutes);

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// cron.schedule('*/20 * * * * *', () => {
cron.schedule('0 7 * * *', () => {
    const today = dayjs().format('YYYY-MM-DD');
    console.log(`Sending reminder for ${today}...`);
    emailService.sendReminders(today);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
