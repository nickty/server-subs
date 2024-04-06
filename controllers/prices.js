const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY)

exports.prices = async (req, res) => {
  const prices = await stripe.prices.list()

  res.json(prices.data.reverse())
}
