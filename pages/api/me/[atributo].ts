import { sendCode } from "controllers/authController"
import { updateAttributeById } from "controllers/users"
import authMiddleware from "lib/middlewares"
import type { NextApiRequest, NextApiResponse } from "next"

// Permite modificar un dato puntual del usuario 
// al que pertenezca el token usado en el request.

async function handler(req: NextApiRequest, res: NextApiResponse, token){
  const atributo = req.query
  const atributoStringifeado = JSON.stringify(atributo)
  const atributoParseado = JSON.parse(atributoStringifeado)
  const atributoPosta = atributoParseado["atributo"]

  if(req.method == "PATCH"){
    const user = await updateAttributeById(token.userId, atributoPosta, req.body.data.value) 
    res.send(user)
  }
  res.status(405).send({message: "Method Not Allowed"})
}

export default authMiddleware(handler);