import type { NextApiRequest, NextApiResponse } from "next"
import { generate, decode } from "lib/jwt"
import { Auth } from 'models/auth'

// Recibe un email y un código y valida que sean los correctos. 
// En el caso de que sean correctos devuelve un token e invalida el código.
// listo

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
  await auth.expiresCode()
  res.send({token})
}