import {
	insertPublish,
	deletePublish,
	insertHashtags
} from "../repositories/publishRepository.js";

async function postPublish(req, res) {
	const publish = res.locals.publish;
	const userId = res.locals.userId;
	try {
		const publishPost = await insertPublish(publish.url, publish.text, userId);
		console.log(publishPost.rows[0])
		res.send(publishPost.rows[0]);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function postDeletePublish(req, res) {
	// const { id } = res.locals.id;
	const userId = res.locals.userId;
	const id = req.params.id
	console.log(id);
	try {
		const deleteAt = await deletePublish(id, userId);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function postsHashtags(req, res) {
	const {postId, hashtag} = req.body

	try {
		await insertHashtags(postId,hashtag)

		res.sendStatus(200)
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { postPublish, postDeletePublish, postsHashtags };
