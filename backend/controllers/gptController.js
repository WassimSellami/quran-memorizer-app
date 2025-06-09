import gptService from '../services/gptService.js';

export const getPreview = async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput) {
            return res.status(400).json({ error: 'userInput' });
        }
        const response = await gptService.getPreview(userInput);
        res.status(201).json({ response });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
