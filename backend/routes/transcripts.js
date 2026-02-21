import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getTranscripts,
  createTranscript,
  deleteTranscript,
  deleteAllTranscripts
} from '../controllers/transcriptController.js';

const router = express.Router();

router.use(authenticate); // All routes require authentication

router.get('/', getTranscripts);
router.post('/', createTranscript);
router.delete('/:id', deleteTranscript);
router.delete('/', deleteAllTranscripts);

export default router;
