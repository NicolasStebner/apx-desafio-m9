import algoliasearch from "algoliasearch"

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const productIndex = client.initIndex('products')

export {productIndex}