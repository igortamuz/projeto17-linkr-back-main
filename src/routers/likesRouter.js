import express from "express";
import { dislike, like, getLikes } from "../controllers/likesController.js";
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";

const router = express.Router();
router.post("/likes/:postId", tokenVerification, like);
router.get("/likes/:postId", tokenVerification, getLikes);
router.delete("/likes/:postId", tokenVerification, dislike);

export default router;
