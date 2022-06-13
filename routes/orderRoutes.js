const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentOrders,
  UpdateOrder,
} = require("../controllers/orderController");
const {
  authorizePermissions,
  requireAuth,
} = require("../middleware/authentication");

router
  .route("/")
  .get([requireAuth, authorizePermissions(true)], getAllOrders)
  .post(requireAuth, createOrder);
router
  .route("/:id")
  .get(requireAuth, getSingleOrder)
  .patch(requireAuth, UpdateOrder);
router.route("/showMyOrders").get(requireAuth, getCurrentOrders);

module.exports = router;
