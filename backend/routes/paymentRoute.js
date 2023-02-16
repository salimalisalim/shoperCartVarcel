const express = require("express");
const {
  processPayment,
  verifyPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/verify").post(isAuthenticatedUser, verifyPayment);

// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
