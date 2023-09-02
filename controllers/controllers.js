const Controller = require("../models/Controller");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all controllers
// @route     GET /api/v1/controllers
// @access    Private
exports.getControllers = asyncHandler(async (req, res, next) => {
  const controller = await Controller.find();
  res
    .status(200)
    .json({ success: true, count: controller.length, data: controller });
});

// @desc      Get single contorller
// @route     GET /api/v1/contorllers/:id
// @access    Private
exports.getController = asyncHandler(async (req, res, next) => {
  const controller = await Controller.findById(req.params.id);
  if (!controller)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: controller });
});

// @desc      create single contorller
// @route     POST /api/v1/contorllers
// @access    Private
exports.createController = asyncHandler(async (req, res, next) => {
  const controller = await Controller.create(req.body);
  res.status(200).json({ success: true, data: controller });
});

// @desc      Update contorller
// @route     PUT /api/v1/contorllers/:id
// @access    Private
exports.updateController = asyncHandler(async (req, res, next) => {
  const controller = await Controller.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!controller)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: controller });
});

// @desc      Delete contorller
// @route     DELETE /api/v1/contorllers/:id
// @access    Private
exports.deleteController = asyncHandler(async (req, res, next) => {
  const controller = await Controller.findByIdAndDelete(req.params.id);
  if (!controller)
    return next(new ErrorResponse(`not found the id: ${req.params.id}`, 404));
  res.status(200).json({ success: true, data: {} });
});
