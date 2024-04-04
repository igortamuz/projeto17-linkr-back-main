import { getPosts } from "../repositories/timelineRepository.js";
import { getShares } from "../repositories/shareRepository.js"

async function timeline(req, res) {
	const userId = res.locals.userId;
	try {
		const posts = await getPosts(userId);
		const shareds = await getShares(userId);

		shareds.rows.forEach(share => {
			posts.rows.push(share)
		});

		const body = posts.rows.sort(function(a,b) { 
      return b.createdAt.getTime() - a.createdAt.getTime() 
    });

		return res.status(200).send(body.splice(0, 20));
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { timeline };
