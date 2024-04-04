import express from "express";
import { followUser, getIsFollowing, getNumFollow, getUserInfo, searchUsers, unfollowUser } from "../controllers/usersController.js";
import { tokenVerification } from "../middlewares/tokenValidationMiddleware.js";
import { searchUsersMiddleware } from '../middlewares/usersMiddleware.js';

const router = express.Router();

router.get("/user/:id", tokenVerification, getUserInfo);
router.get('/search/:username',tokenVerification,searchUsersMiddleware, searchUsers)
router.post('/follow/:followedId',tokenVerification, followUser)
router.delete('/follow/:followedId',tokenVerification, unfollowUser)
router.get('/follow/:followedId', tokenVerification, getIsFollowing)
router.get('/numFollow',tokenVerification,getNumFollow)

export default router;
