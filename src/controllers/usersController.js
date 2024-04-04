import connection from "../db/database.js";
import { getUsersFollowers, getUsersNotFollowers } from "../repositories/timelineRepository.js";
import { deleteFollow, insertFollow, isFollowing, numFollowers } from "../repositories/userRepositories.js";

async function getUserInfo(req, res) {
   const userInfoId = req.params.id;
   const userId = res.locals.userId;

   try {
      const userPromise = await connection.query(
         `
    SELECT 
      users.id,
      users.name,
      users.picture
    FROM users 
    WHERE "id" = $1;
    `,
         [userInfoId]
      );

      if (!userPromise.rows[0]) return res.sendStatus(404);

      const postPromise = await connection.query(
         `SELECT users.id AS "userId", users.name, users.picture, posts.id AS "postId", posts.text, posts.url, posts."userId" = $1 AS owner, a."postId" = "postId" AS liked FROM posts JOIN users ON posts."userId" = users.id LEFT JOIN (SELECT "postId" FROM likes WHERE likes."userId" = $1) AS a ON a."postId" = posts.id WHERE posts."deletedAt" IS NULL AND posts."userId" = $2 ORDER BY posts."createdAt" DESC LIMIT 20;`,
         [userId, userInfoId]
      );

      const body = {
         ...userPromise.rows[0],
         posts: postPromise.rows,
      };

      res.send(body);
   } catch (error) {
      console.log(error);
      return res.sendStatus(500);
   }
}

async function searchUsers(req, res) {
   const { username } = res.locals;
   const {userId} = res.locals
   try {
      const users = await getUsersNotFollowers(userId,username);
      const followers = await getUsersFollowers(userId,username)
      res.send([users,followers]);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
      return;
   }
}

async function followUser(req,res){
   const followerId = res.locals.userId 
   const {followedId} = req.params
   try {
      await insertFollow(followerId, followedId)
      res.sendStatus(201)
   } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
      return
   }
}

async function unfollowUser(req,res){
   const followerId = res.locals.userId 
   const {followedId} = req.params
   try {
      await deleteFollow(followerId, followedId)
      res.sendStatus(204)
   } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
      return
   }
}

async function getIsFollowing(req,res){
   const followerId = res.locals.userId 
   const {followedId} = req.params
   let bool = false
   try {
      const follow = (await isFollowing(followerId, followedId)).rows[0]
      if (follow) {
         bool = true
      }
      res.send({bool,userId:followerId})
   } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
      return
   }
}

async function getNumFollow(req,res){
   const {userId} = res.locals
   try {
      const lengthFollowArray = (await numFollowers(userId))?.rows[0]?.count
      res.send(lengthFollowArray)
   } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
   }
}

export { getUserInfo, searchUsers, followUser, unfollowUser, getIsFollowing, getNumFollow };
