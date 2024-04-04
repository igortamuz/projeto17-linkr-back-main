import bcrypt from "bcrypt";
import { checkUser,createUser } from "../repositories/sigUpRepository.js";

async function create (req,res) {
 const user = res.locals.user
 const passwordEncrypted = bcrypt.hashSync(user.password,10)

 try {
   const userFound = await checkUser(user.email);

   
   if(userFound.rows.length > 0){
      res.status(409).send("conflito, email já cadastrado")
      return
   }

   const insertingUser = await createUser(user.name,user.email,passwordEncrypted,user.picture)

   if(insertingUser.rowCount>0){
    res.sendStatus(201)
    return
   }
    
   res.status(500).send("user not inserted")
   return

 } catch (error) {
    res.status(500).send(error)
    return
 }
}

export {create};