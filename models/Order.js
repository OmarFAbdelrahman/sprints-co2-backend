mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    subTotal: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [OrderItemSchema],
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "In Review",
        "Cancelled",
        "In Progress",
        "On The Way",
        "Delivered",
      ],
      default: "Pending",
    },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
<<<<<<< HEAD
=======

module.exports = mongoose.model("Order", OrderSchema);
>>>>>>> authv2
