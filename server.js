import express from 'express';
import cors from 'cors';
import gptRoutes from './routes/gptRoutes.js';
import pushRoutes from './routes/pushRoutes.js';
import cron from 'node-cron';
import { sendReminders } from './controllers/pushController.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running on Render!');
});

app.use('/api/gpt', gptRoutes);
app.use('/api/push', pushRoutes);

cron.schedule('*/20 * * * * *', () => {
    console.log('Sending reminder every 10 seconds...');
    sendReminders();
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
