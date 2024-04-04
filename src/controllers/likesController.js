import {
	insertLike,
	deleteLike,
	getCountLikes,
	getWhoLiked,
} from "../repositories/likesRepository.js";

async function like(req, res) {
	const postId = req.params.postId;
	const userId = res.locals.userId;
	try {
		insertLike(userId, postId);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function dislike(req, res) {
	const postId = req.params.postId;
	const userId = res.locals.userId;
	try {
		deleteLike(userId, postId);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function getLikes(req, res) {
	const postId = req.params.postId;
	const userId = res.locals.userId;
	try {
		const likes = await getCountLikes(postId);
		const whoLiked = await getWhoLiked(userId, postId);
		const response = {
			...likes.rows[0],
			whoLiked: whoLiked.rows
		}
		return res.status(200).send(response);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { like, dislike, getLikes };
