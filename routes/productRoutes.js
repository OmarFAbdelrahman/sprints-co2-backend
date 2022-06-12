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
router.route("/").get( getProducts).post(createProduct);

router.route("/uploadImage").post(uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
