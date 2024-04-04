import { getUserByEmail } from '../repositories/signinRepository.js';
import joi from 'joi';

const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})

async function signinMiddleware (req, res, next) {
  const { email, password} = req.body
  try {
    const validation = signinSchema.validate({email, password})
    if(validation.error){
      const message = validation.error.details[0].message
      return res.status(400).send(message)
    }
    const existUser = await getUserByEmail(email)
    if(!existUser.rows[0]) return res.sendStatus(401);
    res.locals.userInfo = existUser.rows[0]
    next()
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export {
  signinMiddleware
}