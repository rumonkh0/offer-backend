const express = require("express");
const Product = require("../models/Product");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const advancedResults = require("../middleware/advancedResults");

// app.use('/api/v1/bootcamps', bootcamps);
router
  .route("/")
  .get(advancedResults(Product), getProducts)
  .post(protect, authorize("admin"), createProduct);
router.route("/:id").get(getProduct).put(protect, authorize("admin"), updateProduct).delete(protect, deleteProduct);

module.exports = router;
