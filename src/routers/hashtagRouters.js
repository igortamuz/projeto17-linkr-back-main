import express from 'express';
import { getHashtagsList, getSpecificHashtag,deleteOldHashtags } from '../controllers/hashtagControllers.js';
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";

const router = express.Router()

router.get('/hashtags', getHashtagsList)
router.get('/hashtags/:hashtag',tokenVerification, getSpecificHashtag)
router.delete('/hashtags/:postId', deleteOldHashtags )

export default router;                                                               