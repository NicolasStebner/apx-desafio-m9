import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "lib/middlewares";
import method from "micro-method-router";
import { object, string } from 'yup';
import {createOrder} from "controllers/orders"

let querySchema = object({
  productId: string().required(),
});

let bodySchema = object().shape({
    color: string(),
    direccion_de_envio: string()
  }).noUnknown(true).strict()

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  try{
    await querySchema.validate(req.query)  
  }catch(e){
    res.status(422).send({ field: "query", message: e})
  }

  try{
    await bodySchema.validate(req.body)  
  }catch(e){
    res.status(422).send({ field: "query", message: e})
  }
  
  const { productId } = req.query as any;

  try{
    const { url } = await createOrder(token.userId, productId, req.body)
    res.send({url});
  }catch(e){
    res.status(400).send({message: e})
  }
}

const handler = method({
  post: postHandler,
});

export default authMiddleware(handler);
