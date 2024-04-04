import connection from "../db/database.js";

async function insertPublish(url, text, userId) {
	const promise = await connection.query(
		'INSERT INTO posts(url, text, "userId") VALUES ($1, $2, $3) RETURNING id,text;',
		[url, text, userId],
	);
	return promise;
}

async function deletePublish(id, userId) {
	console.log("aqui" + id)
	const promise = await connection.query(
		'UPDATE posts SET "deletedAt" = NOW() WHERE id = $1 AND "userId" = $2;',
		[id, userId],
	);
	return promise;
}

async function insertHashtags(postId,hashtag) {
	
	const insertingHash = await connection.query(
		`INSERT INTO hashtags (text) VALUES ($1)
		RETURNING id`,
		[hashtag]
	)

	const promiseConnection = await connection.query(`
		INSERT INTO "postsHashtags" ("postId","hashtagId") VALUES ($1,$2)
	`,[postId, insertingHash.rows[0].id]) 

	return promiseConnection
}

export { insertPublish, deletePublish, insertHashtags };
