import express from 'express';
import bodyParser from 'body-parser';
import { getPreview, } from '../controllers/gptController.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/preview', getPreview);

export default router;