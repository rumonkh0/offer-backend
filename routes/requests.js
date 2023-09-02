const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  approveRequest,
  rejectRequest,
  deleteRequest,
} = require("../controllers/requests");

const requests = require("../routes/requests");

// app.use('/api/v1/bootcamps', bootcamps);
router.route("/").get(getRequests).post(createRequest);
router.route("/:id").get(getRequest).put(updateRequest).delete(deleteRequest);
router.put("/:id/approve/", approveRequest);
router.put("/:id/reject/", rejectRequest);

module.exports = router;
