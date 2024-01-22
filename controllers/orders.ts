import { createPreference } from "lib/mercadopago";
import { Order } from "models/order";

const products = {
  1234: {
    title: "Mate APX",
    price: 100,
  },
};

type CreateOrderRes = {
  url: string
}

export async function createOrder(userId:string, productId:string, aditional_info): Promise<CreateOrderRes>{
  const product = products[productId]
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
        title: product.title,
        quantity: 1,
        unit_price: 100,
        currency_id: "ARS"
      }],
      back_urls: {
        success: "https://apx.school",
        pending: "https://apx.school/pending-payments",
      },
      external_reference: order.id,
      notification_url:
        "https://apx-m9-cap-15-payments.vercel.app/api/webhooks/mercadopago",
    },
  });

  return {
    url: pref.init_point
  }
}