const Request = require("../models/Request");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.setFind = asyncHandler(async (req, res, next) => {
  if (req.params.controllerId) {
    if (
      req.controller.role != "admin" &&
      req.controller._id != req.params.controllerId
    )
      return next(new ErrorResponse("not authorized", 404));
    req.findby = { createdBy: req.params.controllerId };
  } else if (req.controller.role != "admin") {
    return next(new ErrorResponse("not authorized", 404));
  }
  next();
});

// @desc      Get all requests
// @route     GET /api/v1/requests
// @route     GET /api/v1/controllers/:controllerId/requests
// @access    Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  req.body.formData.image = req.files[0].path;
  // console.log(req.body.formData);
  const request = await Request.create(req.body.formData);
  res.status(200).json({ success: true, data: "request" });
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

exports.setHistoryFind = asyncHandler(async (req, res, next) => {
  if (req.params.controllerId) {
    //check contoller is owner of product
    if (req.controller.role != "admin" && req.controller._id != req.params._id)
      return next(new ErrorResponse("not authorized", 404));

    // set find parameter
    if (req.params.id) {
      req.findby = {
        createdBy: req.params.controllerId,
        updateProduct: req.params.id,
      };
    } else {
      req.findby = {
        createdBy: req.params.controllerId,
      };
    }
    return next();
  } else if (req.controller.role != "admin") {
    return next(new ErrorResponse("not authorized", 404));
  }
  req.findby = { ...req.findby, updateProduct: req.params.id };
  next();
});

// @desc      GET history of specific product
// @route     GET /api/v1/history/:id
// @route     GET /api/v1/controllers/:controllerId/history/:id
// @access    Private
exports.getHistory = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
