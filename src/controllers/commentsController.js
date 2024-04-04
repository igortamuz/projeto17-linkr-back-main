import { getPostComments, insertComment } from '../repositories/commentsRepository.js';

async function getComments (req, res) {
  const userId = res.locals.userId
  const postId = req.params.postId

  try {
    const comments = await getPostComments(userId, postId)
    res.send(comments.rows)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

async function insertPostComment (req, res) {
  const userId = res.locals.userId
  const postId = req.params.postId
  const text = req.body.text
  if(!text) return res.sendStatus(400)

  try {
    await insertComment(userId, postId, text)
    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  getComments,
  insertPostComment
}