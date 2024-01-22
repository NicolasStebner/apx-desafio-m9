import test from "ava"
import {generate, decode} from "./jwt"

test('jwt encode/decode token',t=>{
  const payload = {marce: true}
  const token = generate(payload)
  const salida = decode(token)
  delete salida["iat"]

  t.deepEqual(payload, salida)
})