import { Router } from "express";
import { editPostController } from "../controllers/postsController.js";
import { editPostMiddleware } from "../middlewares/postsMiddleware.js";
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";

const postsRouter = Router()

postsRouter.put('/editPost/:id',tokenVerification,editPostMiddleware,editPostController)

export default postsRouter