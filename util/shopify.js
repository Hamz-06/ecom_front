import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'testedn.myshopify.com/',
  storefrontAccessToken: process.env.REACT_APP_SHOPIY_TOKEN
});


export {client}
