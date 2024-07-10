const Stripe = require('stripe');
const Payment = require('../models/payment');
const stripe = Stripe('sk_test_51PZc2gJPkxvlRS0U6BPtg4MkX0g4KfV1ojDUhcUrJ0zfyDUEdjsL3jyQTFNLe9bjZTP6qHEWtXrCMXBpoOXx2BdD00xsoLZwA5'); // Replace with your Stripe secret key

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const payment = new Payment({
      amount,
      currency: 'usd',
      paymentIntentId: paymentIntent.id,
    });

    await payment.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
