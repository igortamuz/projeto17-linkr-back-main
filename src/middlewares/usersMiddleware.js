export function searchUsersMiddleware(req,res,next){
    const {username} = req.params
    if (username.length < 3 || typeof username !== 'string') {
        res.sendStatus(400)
        return
    }
    res.locals.username = username.toLowerCase()
    next()
}