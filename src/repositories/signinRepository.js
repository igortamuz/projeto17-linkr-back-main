import connection from "../db/database.js";

async function getUserByEmail (email) {
  const promise = connection.query('SELECT * FROM users WHERE email = $1;', [email])
  return promise
}

export {
  getUserByEmail
}