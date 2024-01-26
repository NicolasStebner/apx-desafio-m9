import type { NextApiRequest, NextApiResponse } from "next"
import authMiddleware from "lib/middlewares";
import { getUserById, updateUserById } from "controllers/users";


async function handler(req: NextApiRequest, res: NextApiResponse, token){
  if(req.method=="GET"){
    // Devuelve info del user asociado a ese token
    try{
      const user = getUserById(token.userId)
      res.send(user)
    }catch(e){
      res.status(404).send({message: e})
    }
  }
  if(req.method=="PATCH"){
    // Permite modificar algunos datos del usuario al que pertenezca el token
    try{
      const user = updateUserById(token.userId, req.body.data)
      res.send(user)
    }catch(e){
      res.status(404).send({message: e})
    }
  }
  res.status(405).send({message:"Method Not Allowed"})
}

export default authMiddleware(handler);