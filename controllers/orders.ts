import { createPreference } from "lib/mercadopago";
import { Order } from "models/order";
import { productIndex } from "lib/algolia";

type CreateOrderRes = {
  url: string,
  orderId:string
}

export async function createOrder(userId:string, productId:string, aditional_info): Promise<CreateOrderRes>{
  const product = await productIndex.getObject(productId, {
    attributesToRetrieve: ["Name", "Unit cost"]
  })

  if (!product) {
    throw "el prod no existe"
  }

  const order = await Order.createNewOrder({
    aditional_info,
    productId,
    userId: userId,
    status: "pending"
  })
  
  const pref = await createPreference({
    body: {
      items: [{
        id: productId,
        title: product["Name"],
        quantity: 1,
        unit_price: product["Unit cost"],
        currency_id: "ARS"
      }],
      back_urls: {
        success: "https://apx.school",
        pending: "https://apx.school/pending-payments",
      },
      external_reference: order.id,
      notification_url:
        "apx-desafio-m9-nu.vercel.app/api/ipn/mercadopago",
    },
  });

  return {
    url: pref.init_point,
    orderId: order.id
  }
}

export async function getOrdersByUserId(userId:string): Promise<Order[]>{
  const orders = await Order.getOrdersByUserId(userId)
  return orders.length ? orders : (function(){throw "No existe ordenes existentes por parte de este usuario"}())
}

export async function getOrderById(orderId:string): Promise<Order>{
  const order = await Order.getOrderById(orderId)
  return order.data ? order : (function(){throw "La order con ese id no existe"}())
}