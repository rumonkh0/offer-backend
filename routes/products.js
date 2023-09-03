const express = require("express");
const Product = require("../models/Product");
const { protect, authorize } = require("../middleware/auth");
const {
  setFind,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router({ mergeParams: true });

// app.use('/api/v1/bootcamps', bootcamps);
router
  .route("/")
  .get(setFind, advancedResults(Product), getProducts)
  .post(protect, authorize("admin"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
