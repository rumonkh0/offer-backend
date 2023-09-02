const Request = require("../models/Request");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all requests
// @route     GET /api/v1/requests
// @route     GET /api/v1/controllers/:controllerId/requests
// @access    Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedresult);
});

// @desc      Get single request
// @route     GET /api/v1/requests/:id
// @route     GET /api/v1/controllers/:controllerId/requests/:requestId
// @access    Public
exports.getRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id);
  if (!request)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: request });
});

// @desc      create single request
// @route     POST /api/v1/requests
// @access    Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create(req.body);
  res.status(200).json({ success: true, data: request });
});

// @desc      Update request
// @route     PUT /api/v1/requests/:id
// @access    Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!request)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: request });
});

// @desc      Approve request
// @route     PUT /api/v1/requests/:id/approve
// @access    Private
exports.approveRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id);
  if (!request)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));

  let product = { ...{ ...request }._doc };
  product.createdAt = request.requestedAt;
  product.approvedBy = "64f2d290ac9d5de56ed33845"; //update with correct variable
  delete product._id;

  //update to products vary with update or new
  if (!request.updateProduct) {
    product = await Product.create(product);
    request.updateProduct = product._id;
  } else {
    const product = await Product.findByIdAndUpdate(
      request.updateProduct,
      product,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product)
      return next(
        new ErrorResponse(`not found the id: ${request.updateProduct}`, 404)
      );
    // res.status(200).json({ success: truwwe, data: product });
  }

  request.status = "approved";
  request.approvedBy = "64f2d290ac9d5de56ed33845";
  request.publishedAt = new Date().toJSON();
  request.save();

  res.status(200).json({ success: true, data: request });
});

// @desc      reject request
// @route     PUT /api/v1/requests/:id/reject
// @access    Private
exports.rejectRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id);
  if (!request)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  request.status = "rejected";
  request.approvedBy = "64f2d290ac9d5de56ed3385c";
  request.save();
  res.status(200).json({ success: true, data: request });
});

// @desc      Delete request
// @route     DELETE /api/v1/requests/:id
// @access    Private
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findByIdAndDelete(req.params.id);
  if (!request)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: {} });
});
