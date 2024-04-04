import connection from '../db/database.js'

async function getPostComments (userId, postId) {
  const comments = connection.query(`
  SELECT 	
    comments.id, 
    users.id AS "userId", 
    users.name, 
    users.picture, 
    comments.text, 
    comments."userId" = posts."userId" AS owner,
    comments."userId" IN (SELECT "followedId" FROM follow WHERE "followerId" = $1) AS followed
  FROM comments 
  JOIN users ON comments."userId" = users.id 
  JOIN posts ON posts.id = $2
  WHERE comments."postId" = $2
  ORDER BY comments.id;
  `, [userId, postId]);
  return comments;
}

async function insertComment (userId, postId, text) {
  const comment = connection.query(`
  INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3);
  `, [userId, postId, text]);
  return comment;
}

export {
  getPostComments,
  insertComment
}