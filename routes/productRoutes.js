const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const { authorizePermissions } = require("../middleware/authentication");
router.route("/").get( getProducts).post(authorizePermissions(true),createProduct);

router.route("/uploadImage").post(authorizePermissions(true),uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authorizePermissions(true),updateProduct)
  .delete(authorizePermissions(true),deleteProduct);

module.exports = router;
