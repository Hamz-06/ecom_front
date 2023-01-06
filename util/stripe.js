
import Stripe from 'stripe'


const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE);


export { stripe }
