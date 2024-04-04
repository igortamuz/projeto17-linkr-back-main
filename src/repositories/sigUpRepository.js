import connection from "../db/database.js";

async function checkUser(email) {

    const user = await connection.query(`SELECT * FROM users WHERE email=$1`, [email])
    console.log("insertingUser");

    return user;
}

async function createUser(name, email, passwordEncrypted, picture){

    const insertedUser = await connection.query(`INSERT INTO users ("name",email,password,picture) VALUES ( $1, $2, $3, $4 );`,[name, email, passwordEncrypted, picture])

    return insertedUser
}

export { checkUser, createUser }