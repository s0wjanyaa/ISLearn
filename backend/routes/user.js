import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { updateAvatarSettings } from '../controllers/userController.js';

const router = express.Router();

router.use(authenticate);

router.put('/avatar-settings', updateAvatarSettings);

export default router;
