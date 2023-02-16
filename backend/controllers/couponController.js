const Coupon = require("../models/couponModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Get All Coupons (Admin)
exports.getAdminCoupons = catchAsyncErrors(async (req, res, next) => {

    const coupons = await Coupon.find();

    res.status(200).json({
        success: true,
        coupons,
    });
});

// Create new Coupon
exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
    const {
        couponCode,
        couponAmount,
        couponStatus,
    } = req.body;

    const coupon = await Coupon.create({
        couponCode,
        couponAmount,
        couponStatus,
        createdAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        coupon,
    });
});

// Find a coupon

exports.findCoupon = catchAsyncErrors(async (req, res, next) => {

    try {

        const { couponCode } = req.body;

        if (!couponCode) {
            return next(new ErrorHander("Please Enter Coupon Code", 400));
        }

        const coupon = await Coupon.findOne({ couponCode });

        if (!coupon) {
            return next(new ErrorHander("Invalid coupon code", 401));
        }

        if (coupon.couponStatus === "Expired") {
            return next(new ErrorHander("This coupon is expired", 401));
        }


        res.status(200).json({
            success: true,
            coupon,
            // message: "Coupen Applied Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid coupon request"
        }
        )
    }
});