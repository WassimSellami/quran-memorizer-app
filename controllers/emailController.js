import { emailService } from '../services/emailService.js';

export const subscribe = async (req, res) => {
    const subscription = req.body;
    try {
        const response = await emailService.subscribe(subscription);
        return res.status(200).json({ response });
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const unsubscribe = async (req, res) => {
    const { email } = req.body;
    const response = await emailService.unsubscribe(email);
    return res.status(200).json({ response });
};