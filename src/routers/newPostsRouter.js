import express from "express";
import { getPostsCount } from "../controllers/getAllPostsCount.js";
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";
const router = express.Router();

router.get("/update", tokenVerification, getPostsCount);

export default router;