import type { NextApiRequest, NextApiResponse } from "next"
import { generate, decode } from "lib/jwt"
import { Auth } from 'models/auth'

// Recibe un email y un código y en caso de que sean correctos y 
// que el código no esté vencido, genera un token JWT con 
// la información mínima del user y se lo devuelve. 
// En el caso de que haya algún error devuelve 401.

export default async function (req: NextApiRequest, res: NextApiResponse){
  const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code)
  
  if(!auth){
    res.status(401).send({
      message: "email o code incorrecto"
    })
  }

  const expires = auth.isCodeExpired()
  if(expires){
    res.status(401).send({
      message:"code expirado"
    })
  }
  var token = generate({userId:auth.data.userId})
  res.send({token})
}