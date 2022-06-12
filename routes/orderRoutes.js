const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentOrders,
  UpdateOrder,
} = require("../controllers/orderController");

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getSingleOrder).patch(UpdateOrder);

module.exports = router;
