const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const shortid = require('shortid');

// const stripe = require("stripe")(process.env.RAZORPAY_KEY_ID);
const Razorpay = require('razorpay')

var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET, });

exports.processPayment = catchAsyncErrors(async (req, res, next) => {

  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "recpt1",
  };
  instance.orders.create(options, function (err, order) {

    // console.log(order);

    res.status(200).json({
      success: true,
      message: "Payment done Out",
      order
    });



  })

});

exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {

  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', 'qNXXzdwdJMPC7mN3O8d637AV')
    .update(body.toString())
    .digest('hex');
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { "signatureIsValid": "false" }
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { "signatureIsValid": "true" }
  res.send(response);

})

/*
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

*/