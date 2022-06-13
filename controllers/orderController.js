const Order = require("../models/Order");
const Product = require("../models/Product");
const { checkPermissions } = require("../controllers/authController");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  res.send("createOrder");
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

const UpdateOrder = async (req, res) => {
  res.send("UpdateOrder");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentOrders,
  UpdateOrder,
};
