import {User} from "models/users"
import {Auth} from "models/auth"
import gen from "random-seed"
import {addMinutes} from "date-fns"

const seed = "random"
const random = gen.create(seed)

export async function findOrCreateAuthWithCode(email:string): Promise<Auth> {
  const cleanEmail = email.trim().toLowerCase()
  const auth = await Auth.findByEmail(cleanEmail)
  
  if(auth){
    return auth
  }else{
    const newUser = await User.createNewUser({
      email:cleanEmail
    })
    const newAuth = await Auth.createNewAuth({
      email:cleanEmail,
      userId:newUser.id,
      code:"",
      expires: new Date()
    })
    return newAuth
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuthWithCode(email)
  const code = random.intBetween(1000,9999)
  const now = new Date()
  const twentyMinutesFromNow = addMinutes(now,20)
  auth.data.code = code
  auth.data.expires = twentyMinutesFromNow
  await auth.push()
  //aca deberia enviar el email
  console.log("email enviado a " + email + " con código " + auth.data.code)
  return true
}