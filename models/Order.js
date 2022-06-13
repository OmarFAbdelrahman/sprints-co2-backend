mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  quantity: {
    type: Number,
    required: true,
  },
  gallery: {
    type: [String],
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
    paymentMethod: {
      type: String,
      required: [true, "Please provide the payment method"],
      enum: ["Cash", "Card"],
    },
    // card: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Card",
    // },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
