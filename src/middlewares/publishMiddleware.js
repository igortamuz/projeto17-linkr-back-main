export function deletePublishMiddleware(req, res, next) {
    res.locals.id = req.params.id   
    next()
}