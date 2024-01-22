import type { NextApiRequest, NextApiResponse } from "next"
import parseBearerToken from "parse-bearer-token";
import {decode} from "lib/jwt"
import {User} from "models/users"
import authMiddleware from "lib/middlewares";
import { getUserById } from "controllers/users";

// Es un endpoint seguro (o sea que verifica que el request tenga token y que sea correcto) y 
// en base al token debe devolver la información de ese user. En el caso de un token
// incorrecto debe devolver 401.

async function handler(req: NextApiRequest, res: NextApiResponse,token){
  const user = getUserById(token)
  res.send(user)
}

export default authMiddleware(handler);