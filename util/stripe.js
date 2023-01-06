
import Stripe from 'stripe'

const stripe = Stripe(process.env.REACT_APP_STRIPE);


export { stripe }
