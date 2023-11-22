const { dbUrl, mongoose } = require('../config/dbConfig');
const { bookingModel } = require('../models/bookingShema');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
mongoose.set('strictQuery', false)
mongoose.connect(dbUrl);

const getBooking = async (req, res) => {
  try {
    const data = await bookingModel.find();
    res.status(200).send({
      message: "Entered booking via mongoose",
      data: data
    })

  } catch (error) {
    console.log(error);
    res.status(500).send('External server error', error);
  }
}

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBooking, createPaymentIntent };