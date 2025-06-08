import gptService from '../services/gptService.js';

export const getPreview = async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput) {
            return res.status(400).json({ error: 'userInput' });
        }
        const preview = await gptService.createOrder(userInput);
        res.status(201).json({ preview });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
