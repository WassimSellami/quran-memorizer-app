import express from 'express';
import bodyParser from 'body-parser';
import { getFullPlan, getPreviewPlan } from '../controllers/gptController.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/plan/preview', getPreviewPlan);
router.post('/plan/full', getFullPlan);

export default router;