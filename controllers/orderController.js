const Order = require("../models/Order");
const Product = require("../models/Product");
const { checkPermissions } = require("../controllers/authController");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  const { cartItems, shippingFee, paymentMethod, cardId } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  if (!shippingFee) {
    throw new CustomError.BadRequestError("Please provide shipping fee");
  }
  if (!paymentMethod || paymentMethod !== "Card" || paymentMethod !== "Cash") {
    throw new CustomError.BadRequestError(
      "Please provide valid payment method"
    );
  }
  if (paymentMethod === "Card" && !cardId) {
    throw new CustomError.BadRequestError("Please provide card id");
  }
  // if(paymentMethod === "Card" && cardId){
  //   const card = await Card.findOne({_id: cardId});
  //   if(!card){
  //     throw new CustomError.NotFoundError(`No card found with the id: ${cardId}`);
  //   }
  // }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const product = await Product.findOne({ _id: item.product });
    if (!product) {
      throw new CustomError.NotFoundError(
        `No product found with id : ${item.product}`
      );
    }

    const { name, price: originalPrice, gallery, discount, _id } = dbProduct;
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price: originalPrice - discount,
      gallery,
      product: _id,
    };

    orderItems = [...orderItems, singleOrderItem];

    subtotal += item.quantity * price;
  }
  const total = shippingFee + subtotal;

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    shippingFee,
    paymentMethod,
    //card: cardId,
    user: req.user.id,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const UpdateOrderStatus = async (req, res) => {
  const { id: orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }

  order.status = status;
  await order.save();
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentOrders,
  UpdateOrderStatus,
};
