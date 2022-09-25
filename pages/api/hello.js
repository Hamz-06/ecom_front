// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from "../../util/shopify";
export default async function handler(req, res) {
  // console.log(req.method)
  
  const items = JSON.parse(req.body.lineItems)
  // console.log(items)
  // res.status(200).json({lil:'f'})
  

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/category/all/?success=false`,
      });
      
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

