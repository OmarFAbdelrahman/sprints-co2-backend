const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { authorizePermissions } = require("../middleware/authentication");

router.route("/").get(getCategories).post(authorizePermissions(true),createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .patch(authorizePermissions(true),updateCategory)
  .delete(authorizePermissions(true),deleteCategory);

module.exports = router;
