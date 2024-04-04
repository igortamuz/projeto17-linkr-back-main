import express from 'express';
import { insertPostComment, getComments } from '../controllers/commentsController.js';
import { tokenVerification } from '../middlewares/tokenValidationMiddleware.js';

const router = express.Router()

router.get('/comments/:postId', tokenVerification, getComments)
router.post('/comments/:postId', tokenVerification, insertPostComment)

export default router;