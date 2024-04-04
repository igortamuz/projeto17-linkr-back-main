import { editPost } from "../repositories/postsRepositories.js"

export async function editPostController(req,res){
    const {id} = req.params
    const {text} = req.body
    try {
        await editPost(text,id)
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
        return
    }
}