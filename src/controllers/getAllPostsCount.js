import { getCountPosts } from "../repositories/getAllPostsCountRepository.js";

async function getPostsCount(req, res) {
  const userId = res.locals.userId
  try {
    const count = await getCountPosts(userId);
    return res.send(count.rows[0])
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  getPostsCount
}