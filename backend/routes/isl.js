import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { convertToISLGrammar } from '../controllers/islController.js';

const router = express.Router();

router.use(authenticate);

router.post('/convert-to-isl', convertToISLGrammar);

export default router;
