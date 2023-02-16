const express = require("express");

const {
    createCoupon,
    getAdminCoupons,
    findCoupon
} = require("../controllers/couponController");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/coupon/find").post(findCoupon);

router
    .route("/admin/coupon/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createCoupon);

router
    .route("/admin/coupons")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCoupons);



module.exports = router;
