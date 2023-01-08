// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from "../../util/stripe";
export default async function handler(req, res) {
  // console.log(req.method)

  const items = JSON.parse(req.body)
  // res.send({lol:'lx'})
  console.log(req.body)
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${req.headers.origin}/cart/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart/?session_id={CHECKOUT_SESSION_ID}`,
      });


      res.status(200).send(session)

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

