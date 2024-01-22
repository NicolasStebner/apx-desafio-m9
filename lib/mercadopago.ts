import { MercadoPagoConfig, MerchantOrder, Preference} from 'mercadopago';
import type { MerchantOrderGetData, } from 'mercadopago/dist/clients/merchantOrder/get/types';
import type { PreferenceCreateData } from 'mercadopago/dist/clients/preference/create/types';

const client = new MercadoPagoConfig({accessToken: process.env.MP_TOKEN});
const merchantOrder = new MerchantOrder(client);
const preference = new Preference(client)

export async function getMerchantOrder(ordenData: MerchantOrderGetData){
  const res = await merchantOrder.get(ordenData)
  return res;
}

export async function createPreference(data: PreferenceCreateData){
  const res = await preference.create(data)
  return res
}
