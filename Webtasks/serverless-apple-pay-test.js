var stripe = require('stripe');

module.exports = function(context, req, res) {
  stripe(context.secrets.STRIPE_SECRET_KEY).charges.create({
    source: context.data.stripeToken,
    amount: 100,
    currency: 'gbp', // Can also take usd, eur, etc.
    description: 'Test Item',
    receipt_email: context.data.email
  }, function (error, charge) {
    if (error) {
      res.writeHead(error.code || 400);
      res.end(error.stack || error.message || error.toString());
      return
    }

    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ charge: charge }));
  });
};
