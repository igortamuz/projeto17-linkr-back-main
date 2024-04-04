import express from 'express';
import { signin } from '../controllers/signinController.js';
import { signinMiddleware } from '../middlewares/signinMiddleware.js';

const router = express.Router()

router.post('/signin', signinMiddleware, signin)

export default router;