import express from "express";
import {
	postPublish,
	postDeletePublish,
	postsHashtags
} from "../controllers/publishController.js";
import { publishMiddleware } from "../middlewares/schemasMiddleware.js";
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";
import { deletePublishMiddleware } from "../middlewares/publishMiddleware.js";

const router = express.Router();
router.post("/post", tokenVerification, publishMiddleware, postPublish);
router.delete(
	"/post/:id", tokenVerification,
	postDeletePublish,
);
router.post("/hashtags", postsHashtags)

export default router;
