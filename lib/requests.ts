import { NextApiRequest } from "next";

export default function getOffsetAndLimitFromReq(req: NextApiRequest, maxLimit = 100, maxOffset = 10000){
  const queryLimit = parseInt(req.query.limit as string || "0")
  const queryOffset = parseInt(req.query.offset as string || "0")
  let limit = 10;
  
  if(queryLimit > 0 && queryLimit < maxLimit){
    limit = queryLimit
  }else if(queryLimit > maxLimit){
    limit = maxLimit
  }

  const offset = queryOffset ? queryOffset < maxOffset ? queryOffset : 0 : 0;

  return {
    limit, offset
  }
}