import type { NextApiRequest, NextApiResponse } from "next"
import { findOrCreateAuthWithCode, sendCode } from '../../controllers/authController';

export default async function (req: NextApiRequest, res: NextApiResponse){
  res.send({message: "api.index found"})
}