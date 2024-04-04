import connection from '../db/database.js';

async function getPostById(id){
    const promise = connection.query("SELECT * FROM posts WHERE id = ($1);",[id])
    return promise
}

async function editPost(text,id){
    const promise = connection.query('UPDATE posts SET text = ($1) WHERE id = ($2);',[text,id])
    return promise
}

export {getPostById,editPost}