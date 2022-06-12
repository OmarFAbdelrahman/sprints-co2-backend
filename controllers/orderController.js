const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  res.send("createOrder");
};
const getAllOrders = async (req, res) => {
  res.send("getAllOrders");
};
const getSingleOrder = async (req, res) => {
  res.send("getSingleOrder");
};
const getCurrentOrders = async (req, res) => {
  res.send("getCurrentOrders");
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
