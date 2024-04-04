import connection from '../db/database.js'

async function getHashtags () {
  const promise = connection.query(`
  SELECT count(text),hashtags.text FROM "hashtags" GROUP BY text ORDER BY count(text) DESC LIMIT 10
  `)
  return promise;
}

async function getNamedPosts(hashtag, userId){

  const promise = await connection.query(`
    SELECT
      users.id AS "userId", 
      users.name, users.picture, 
      posts.id AS "postId", 
      posts.text, 
      posts.url,
      posts."userId" = $1 AS owner,
      posts."createdAt",
      a."postId" = middle."postId" AS liked
    FROM hashtags
    JOIN "postsHashtags" AS middle ON middle."hashtagId" = hashtags.id
    JOIN posts ON middle."postId" = posts.id
    JOIN users ON posts."userId" = users.id
    LEFT JOIN (SELECT "postId" FROM likes 
               WHERE likes."userId" = $1 ) AS a ON a."postId" = posts.id
    WHERE posts."deletedAt" IS NULL
    AND hashtags.text = $2
    ORDER BY posts."createdAt" DESC
  `,[userId, hashtag])

  return promise
}

async function deleteHashtags(postId){

  const promise = await connection.query(`
    DELETE FROM "postsHashtags"
      WHERE "postsHashtags"."postId" = $1
  `,[postId])

  return promise
}

export {
  getHashtags,
  getNamedPosts,
  deleteHashtags
}