import express from "express";
import { timeline } from "../controllers/timelineController.js";
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";
const router = express.Router();

router.get("/posts", tokenVerification, timeline);

export default router;
