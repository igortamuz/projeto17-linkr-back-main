import connection from '../db/database.js'

function getCountPosts (userId) {
  const count = connection.query(`
  SELECT 
    COUNT(posts.id)
  FROM posts
  JOIN follow ON follow."followerId" = $1
  WHERE posts."userId" = follow."followedId";
  `, [userId]);
  return count;
}

export {
  getCountPosts
}