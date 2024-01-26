import type { NextApiRequest, NextApiResponse } from "next";
import { productIndex } from 'lib/algolia';
import getOffsetAndLimitFromReq from "lib/requests";

// Buscar productos en nuestra base de datos. 
// Chequea stock y todo lo necesario. 
// Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method == "GET"){
    const {offset, limit} = getOffsetAndLimitFromReq(req, 10);
    const rta = await productIndex.search(req.query.q as string,{
      hitsPerPage: limit,
      page : offset > 1 ? Math.floor(offset/limit) : 0,
    })

    res.send({
      results: rta.hits,
      pagination: {
        page: Math.floor(offset/limit),
        limit,
        total: rta.nbHits
      }
    })
  }else{
    res.status(405).json({message:"Method Not Allowed"})
  }
}
