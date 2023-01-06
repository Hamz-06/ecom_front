
import Stripe from 'stripe'

console.log(process.env.NEXT_PUBLIC_STRIPE)
console.log(`${process.env.NEXT_PUBLIC_STRIPE}`)
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE);


export { stripe }
