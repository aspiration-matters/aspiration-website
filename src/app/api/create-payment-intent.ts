// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe("your-secret-key-here",
//      { apiVersion: "2025-02-24.acacia" });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

//   const { amount } = req.body;

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount * 100, // Convert to cents
//     currency: "inr",
//   });

//   res.json({ clientSecret: paymentIntent.client_secret });
// }
