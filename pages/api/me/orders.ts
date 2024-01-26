import { sendCode } from "controllers/authController"
import type { NextApiRequest, NextApiResponse } from "next"
import { getOrdersByUserId } from "controllers/orders"
import authMiddleware from "lib/middlewares"

// Devuelve todas mis ordenes con sus status.

async function handler(req: NextApiRequest, res: NextApiResponse, token){
  const {userId} = req.body

  if(!userId){
    res.status(400).send({message:"Body incompleto"})
  }

  if(req.method == "GET"){
    try{
      const results =  await getOrdersByUserId(userId)
      res.send(results)
    }catch(e){
      res.status(404).send({message: e})
    }
  }
  res.status(405).send({message: "Method Not Allowed"})
}

export default authMiddleware(handler);