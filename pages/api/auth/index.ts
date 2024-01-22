import { sendCode } from "controllers/authController"
import type { NextApiRequest, NextApiResponse } from "next"

// Recibe un body con un email. Utiliza este email para encontrar/crear un registro auth. 
// En el caso de que tenga que crear el registro de la collection/tabla auth también crea 
// el registro user correspondiente. Genera un código con fecha de vencimiento y le envía 
// el código por email (usando sendgrid) al user que haya solicitado autenticarse.

export default async function (req: NextApiRequest, res: NextApiResponse){
  const result =  await sendCode(req.body.email)
  res.send(result)
}