const mongoose = require("mongoose");


const couponSchema = new mongoose.Schema({

    couponCode: {
        type: String,
        required: true,

    },
    couponAmount: {
        type: Number,
        required: true,

    },
    couponStatus: {
        type: String,
        required: true,
        default: "Active",

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = mongoose.model("Coupon", couponSchema);
