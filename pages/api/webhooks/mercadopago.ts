import type { NextApiRequest, NextApiResponse } from "next"
import { getMerchantOrder } from 'lib/mercadopago'
import { Order } from "models/order";

export default async function(req: NextApiRequest, res: NextApiResponse){
  const {id, topic} = req.query
  
  if(topic == "merchant_order"){
    const order = await getMerchantOrder({merchantOrderId: id as string | number})
    if(order.order_status == 'paid'){
      const orderId = order.external_reference;
      const myOrder = new Order(orderId)
      await myOrder.pull()
      myOrder.data.status = "closed"
      await myOrder.push()
      //aca el orderId en firebase deberia tener al comprador, de ahi 
      //sacamos a su usuario con el id y le enviamos un email
      // sendMail("enviar email al usuario que compra!")
      //
      // otro email al vendedor de que alguien compro un producto
      //sendEmail interno
    }
  }

  res.send('ok')
}