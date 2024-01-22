import type { NextApiRequest, NextApiResponse } from "next"
import { findOrCreateAuthWithCode, sendCode } from '../../controllers/authController';

export default async function (req: NextApiRequest, res: NextApiResponse){
  // const auth = await findOrCreateAuthWithCode(req.body.email)
  const auth = await sendCode(req.body.email)
  res.send(auth)
}