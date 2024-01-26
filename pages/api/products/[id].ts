import type { NextApiRequest, NextApiResponse } from "next"
import { productIndex } from "lib/algolia"

// Obtiene toda data de un producto

export default async function (req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query
  if(req.method == "GET"){
    const rta =  await productIndex.getObject(id as string)
    res.send(rta)
  }
  res.status(405).send({message: "Method Not Allowed"})
}