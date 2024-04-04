import connection from "../db/database.js";

export async function insertFollow(followerId, followedId) {
   const promise = await connection.query(
      'INSERT INTO follow("followerId","followedId") VALUES($1,$2);',
      [followerId, followedId]
   );
   return promise;
}

export async function deleteFollow(followerId, followedId) {
   const promise = await connection.query(
      'DELETE FROM follow WHERE "followerId" = $1 AND "followedId" = $2;',
      [followerId, followedId]
   );
   return promise;
}

export async function isFollowing(followerId, followedId) {
   const promise = await connection.query(
      'SELECT * FROM follow WHERE "followerId" = $1 AND "followedId" = $2;',
      [followerId, followedId]
   );
   return promise;
}

export async function numFollowers(userId) {
   const promise = await connection.query(
      'SELECT COUNT(id) FROM follow WHERE "followerId" = $1',
      [userId]
   );
   return promise;
}
