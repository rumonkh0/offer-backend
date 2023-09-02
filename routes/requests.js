const express = require("express");
const Request = require("../models/Request");
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  approveRequest,
  rejectRequest,
  deleteRequest,
} = require("../controllers/requests");

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

// app.use('/api/v1/bootcamps', bootcamps);
router
  .route("/")
  .get(protect, advancedResults(Request), getRequests)
  .post(protect, createRequest);
router.route("/:id").get(protect, getRequest).put(updateRequest).delete(deleteRequest);
router.put("/:id/approve/", protect, approveRequest);
router.put("/:id/reject/", protect, rejectRequest);

module.exports = router;
