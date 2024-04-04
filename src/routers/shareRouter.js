import express from 'express';
import { getCountShare, sharePost } from '../controllers/shareController.js';
import { tokenVerification } from '../middlewares/tokenValidationMiddleware.js';

const router = express.Router();

router.post("/share/:postId", tokenVerification, sharePost);
router.get('/share/:postId', getCountShare);

export default router;