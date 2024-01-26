import { sendCode } from "controllers/authController"
import { getOrderById } from "controllers/orders"
import type { NextApiRequest, NextApiResponse } from "next"

// Devuelve una orden con toda la data incluyendo el estado de la orden

export default async function (req: NextApiRequest, res: NextApiResponse){
  const {orderId} = req.query
  if(!orderId){
    res.status(400).send({message:"body incompleto"})
  }
  if(req.method == "GET"){
    try{
      const result =  await getOrderById(orderId as string)
      res.send(result)
    }catch(e){
      res.status(404).send({message:e})
    }
  }
  res.status(405).send({message: "Method Not Allowed"})
}