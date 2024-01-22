import { NextApiRequest, NextApiResponse } from "next"
import parseBearerToken from "parse-bearer-token"
import { decode } from "./jwt"

export default function authMiddleware(callback){
  return function(req: NextApiRequest, res: NextApiResponse){
    const token = parseBearerToken(req)
    if(!token){
      res.status(401).send({ message: "No hay token" })
    }

    const decodedToken = decode(token)

    if(decodedToken){
      callback(req, res, decodedToken)
    }else{
      res.status(401).send({ message: "token incorrecto" })
    }
  }
}