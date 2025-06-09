import gptService from '../services/gptService.js';

export const getPreviewPlan = async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput) {
            return res.status(400).json({ error: 'userInput' });
        }
        const response = await gptService.getPreviewPlan(userInput);
        res.status(201).json({ response });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getFullPlan = async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput) {
            return res.status(400).json({ error: 'userInput' });
        }
        const response = await gptService.getFullPlan(userInput);
        res.status(201).json({ response });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
