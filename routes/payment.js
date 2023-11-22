const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config(); // Loading environment variables from .env file
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  try {
    const { token, amount } = req.body;
    const idempotencyKey = uuidv4();

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      payment_method_types: ['card'],
      receipt_email: token.email,
    }, {
      idempotencyKey
    });

    console.log('PaymentIntent created:', paymentIntent.id);
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error('PaymentIntent creation failed:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = router;
