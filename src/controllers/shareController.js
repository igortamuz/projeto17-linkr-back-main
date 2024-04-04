import { getCountShareById, insertShare, verifySharedByUser } from "../repositories/shareRepository.js"

async function sharePost (req, res) {
  const userId = res.locals.userId
  const postId = req.params.postId

  try {
    const verifyShared = await verifySharedByUser(userId, postId)
    if(parseInt(verifyShared.rows[0].count) > 0) return res.sendStatus(409);
    await insertShare(userId, postId)
    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

async function getCountShare (req, res) {
  const postId = req.params.postId
  try {
    const count = await getCountShareById(postId)
    return res.send(count.rows[0])
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  sharePost,
  getCountShare
}