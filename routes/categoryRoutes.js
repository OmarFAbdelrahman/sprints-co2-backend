const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
