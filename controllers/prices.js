const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY)

const User = require('../models/user')

exports.prices = async (req, res) => {
  const prices = await stripe.prices.list()

  res.json(prices.data.reverse())
}

exports.createSubscription = async (req, res) => {
  console.log('check request', req.body)
  try {
    const user = await User.findById({ stripe_customer_id: req.body.price })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      customer: user.stripe_customer_id,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })
    res.json(session.url)
  } catch (error) {
    console.log(error)
  }
}
