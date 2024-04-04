import { getPostById } from '../repositories/postsRepositories.js';

export async function editPostMiddleware(req,res,next){
    const {id} = req.params
    try {
        const postExists = (await getPostById(id)).rows[0]
        if(!postExists){
            res.sendStatus(404)
            return
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
        return
    }
    next()
}