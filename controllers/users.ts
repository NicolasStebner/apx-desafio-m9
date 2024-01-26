import { User } from "models/users";

export async function getUserById(id:string): Promise<any> {
  const user = new User(id)
  if(user){
    await user.pull()
    return user.data
  }
  throw "No existe usuario con ese id"
}

export async function updateUserById(id:string, data): Promise<any>{
  const user = new User(id)
  if(user){
    user.data = data
    await user.push()
    return user.data
  }
  throw "No existe usuario con ese id"
}

export async function updateAttributeById(id:string, atributo:string, value:any): Promise<User>{
  const user = new User(id)
  await user.pull() //traigo toda la data
  if(user){
    user.data[atributo] = value
    await user.push()
    return user
  }
  throw "No existe usuario con ese id"
}