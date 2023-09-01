const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

// app.use('/api/v1/bootcamps', bootcamps);
router.route("/").get(getProducts).post(createProduct);
router.route("/").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
