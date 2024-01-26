import { firestore } from "../lib/firestore";

const collection = firestore.collection("orders")

// type OrderData = {
//   status: "pending"|"payed"
// }

export class Order{
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id){
    this.id = id
    this.ref = collection.doc(id)
  }

  async pull(){
    const snap = await this.ref.get()
    this.data = snap.data()
  }

  async push(){
    this.ref.update(this.data)
  }
  
  static async createNewOrder(newOrderData={}){
    const newOrderSnap = await collection.add(newOrderData)
    const newOrder = new Order(newOrderSnap.id)
    newOrder.data = newOrderData
    return newOrder
  }

  static async getOrdersByUserId(userId:string){
    const orders = []
    const results = await collection.where("userId","==",userId).get()
    if(results.docs.length){
      results.docs.forEach((o)=>{
        const newOrder = new Order(o.id)
        newOrder.data = o.data()
        orders.push(newOrder)
      })
      return orders
    }
  }

  static async getOrderById(orderId:string){
    const order = await collection.doc(orderId).get()
    const orderInstance = new Order(order.id)
    orderInstance.data = order.data()
    return orderInstance
  }
}
