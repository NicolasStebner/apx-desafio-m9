import Airtable from "airtable";

//Conexion a la base de datos de Airtable, la base tiene que estar en la url de la misma.
export const aitableBase = new Airtable({
  apiKey:process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE);
