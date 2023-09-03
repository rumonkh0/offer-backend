const Product = require("../models/Product");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const advancedResults = require("../middleware/advancedResults");

exports.setFind = asyncHandler(async (req, res, next) => {
  if (req.params.controllerId) {
    req.findby = { createdBy: req.params.controllerId };
  }
  next();
});

// @desc      Get all products
// @route     GET /api/v1/products
// @route     GET /api/v1/products/:productsId/products
// @access    Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: product });
});

// @desc      create single product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.approvedBy = req.controller._id;
  req.body.createdBy = req.controller._id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, data: product });
});

// @desc      Update product
// @route     PUT /api/v1/products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: product });
});

// @desc      Delete product
// @route     DELETE /api/v1/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: {} });
});
