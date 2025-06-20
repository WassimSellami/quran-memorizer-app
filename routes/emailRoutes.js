import express from 'express';
import bodyParser from 'body-parser';
import { subscribe, unsubscribe } from '../controllers/emailController.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

export default router;