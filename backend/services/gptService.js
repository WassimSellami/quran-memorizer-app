import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const gptService = {
    createOrder: async (userInput) => {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
        // todo: prompt engineering: 
        const prompt = 'Hello, can u generate a preview plan using these info: ' + userInput;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        // it should return a json and take response.text().preview
        return response.text();
    }
};

export default gptService;