import express from 'express';
import cors from 'cors'
import gptRoutes from './routes/gptRoutes.js';

const app = express();

const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.use('/api/gpt', gptRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});