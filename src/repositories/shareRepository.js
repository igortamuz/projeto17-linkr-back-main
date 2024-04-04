import connection from '../db/database.js'

async function getShares (userId) {
  const shares = await connection.query(`
  SELECT 
    us.name AS "sharedBy",
    us.id = ${userId} AS "reposter",
    users.id AS "userId", 
    users.name, 
    users.picture, 
    posts.id AS "postId", 
    posts.text, posts.url, 
    posts."userId" = ${userId} AS owner, 
    sh."createdAt",
    a."postId" = posts.id AS liked,
    sh."postId" = posts.id AS repost
  FROM "sharedPosts" AS sh 
  JOIN posts ON posts.id = sh."postId"
  JOIN users ON posts."userId" = users.id 
  LEFT JOIN users AS us ON us.id = sh."userId"
  LEFT JOIN (SELECT "postId" FROM likes WHERE likes."userId" = ${userId}) AS a ON a."postId" = posts.id 
  WHERE posts."deletedAt" IS NULL 
  ORDER BY posts."createdAt" DESC LIMIT 20;
  `)
  return shares;
}

async function insertShare (userId, postId) {
  const insert = await connection.query(`
    INSERT INTO "sharedPosts" ("userId", "postId") VALUES ($1, $2);
  `, [userId, postId])
  return insert;
}

async function verifySharedByUser (userId, postId) {
  const count = await connection.query(`
  SELECT
    COUNT(id)
  FROM "sharedPosts" AS sh
  WHERE sh."userId" = $1 AND sh."postId" = $2;
  `, [userId, postId])
  return count;
}

async function getCountShareById (postId) {
  const count = await connection.query(`
  SELECT
    COUNT(id)
  FROM "sharedPosts" AS sh
  WHERE sh."postId" = $1;
  `, [postId])
  return count;
}

export {
  getShares,
  insertShare,
  getCountShareById,
  verifySharedByUser
}