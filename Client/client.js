var stripeID = "pk_test_6pRNASCoBOKtIshFeQd4XMUh"; // Replace with your own
var webtaskInstance = "https://YOUR.run.webtask.io/serverless-apple-pay-test";
var stripe = Stripe(stripeID);

var successArea = document.getElementById('paymentSuccessful');
var errorArea = document.getElementById('paymentError');
var paymentArea = document.getElementById('takePayment');

function sendToken(token) {
  return fetch(webtaskInstance, {
    method: 'POST',
    body: JSON.stringify({
      stripeToken: token
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
}

function showPaymentSuccess() {
  errorArea.style.display = 'block';
  successArea.setAttribute("aria-hidden", "false");

  errorArea.style.display = 'none';
  errorArea.setAttribute("aria-hidden", "true");
  paymentArea.style.display = 'none';
}

function showPaymentError() {
  errorArea.style.display = 'block';
  errorArea.setAttribute("aria-hidden", "false");
}

var paymentRequest = stripe.paymentRequest({
  country: 'GB', // Replace with your country
  currency: 'gbp', // Can also take usd, eur, etc.
  total: {
    label: 'Test Item',
    amount: 100,
  },
  requestPayerName: true,
  requestPayerEmail: true,
  // Can also take requestShipping, shippingOptions, etc.
});

var elements = stripe.elements();
var prButton = elements.create('paymentRequestButton', {
  paymentRequest: paymentRequest,
});

// Check the availability of the Payment Request API first.
paymentRequest.canMakePayment().then(function(result) {
  if (result) {
    prButton.mount('#payment-request-button');
  } else {
    document.getElementById('payment-request-button').style.display = 'none';
  }
});

paymentRequest.on('token', function(ev) {
  // Send the token to your server to charge it!
  sendToken(ev.token.id)
  .then(function(response) {
    if (response.ok) {
      ev.complete('success');
      showPaymentSuccess();
    } else {
      ev.complete('fail');
      showPaymentError();
    }
 });
});

document.getElementById('orderAgainOutlet').addEventListener('click', function(e) {
  successArea.style.display = 'none';
  successArea.setAttribute("aria-hidden", "true");

  errorArea.style.display = 'none';
  errorArea.setAttribute("aria-hidden", "true");
  paymentArea.style.display = 'block';

  e.preventDefault();
});
