import connection from "../db/database.js";

async function insertLike(userId, PostId) {
	connection.query(`INSERT INTO likes ("postId","userId") VALUES ($1,$2);`, [
		PostId,
		userId,
	]);
}

async function deleteLike(userId, PostId) {
	connection.query(`DELETE FROM likes WHERE "userId"=$1 AND "postId"=$2;`, [
		userId,
		PostId,
	]);
}

async function getCountLikes(PostId) {
	const likes = connection.query(
		`SELECT "postId", COUNT("userId") AS "numLikes" FROM likes WHERE "postId" = $1 GROUP BY "postId";`,
		[PostId],
	);
	return likes;
}

async function getWhoLiked (userId, PostId) {
	const whoLiked = connection.query(
		`SELECT 
			users.name
		FROM likes
		JOIN users ON users.id = likes."userId"
		WHERE likes."postId" = $1 AND users.id NOT IN ($2) LIMIT 2;`, [PostId, userId]
	)
	return whoLiked;
}

export { insertLike, deleteLike, getCountLikes, getWhoLiked };
