import { sendCode } from "controllers/authController"
import type { NextApiRequest, NextApiResponse } from "next"

// Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.
// Listo, solo falta que envie el mail con el codigo
export default async function (req: NextApiRequest, res: NextApiResponse){
  if(req.method == "POST"){
    const result =  await sendCode(req.body.email)
    res.send(result)
  }
  res.status(405).send({message: "Method Not Allowed"})
}