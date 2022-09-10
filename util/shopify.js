
import Stripe from 'stripe'


const stripe = Stripe(process.env.REACT_APP_SHOPIY_TOKEN);


export {stripe}
