import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function signin(req, res) {
   const { password } = req.body;
   const userInfo = res.locals.userInfo;

   try {
      if (!bcrypt.compareSync(password, userInfo.password))
         return res.status(401).send("Usuário e/ou senha invalido(s)!");

      const token = jwt.sign(
         {
            userId: userInfo.id,
         },
         process.env.SECRET_TOKEN
      );

      res.send({ token: token, picture: userInfo.picture ,userId: userInfo.id});
   } catch (error) {
      console.log(error);
      return res.sendStatus(500);
   }
}

export { signin };
