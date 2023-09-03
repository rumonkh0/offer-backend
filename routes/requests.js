const express = require("express");
const Request = require("../models/Request");
const {
  setFind,
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  approveRequest,
  rejectRequest,
  deleteRequest,
  setHistoryFind,
  getHistory,
} = require("../controllers/requests");

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, setFind, advancedResults(Request), getRequests)
  .post(protect, createRequest);
router.get(
  "/history",
  protect,
  setHistoryFind,
  advancedResults(Request),
  getHistory
);
router
  .route("/:id")
  .get(protect, getRequest)
  .put(updateRequest)
  .delete(deleteRequest);
router.put("/:id/approve/", protect, approveRequest);
router.put("/:id/reject/", protect, rejectRequest);

router.get(
  "/history/:id",
  protect,
  setHistoryFind,
  advancedResults(Request),
  getHistory
);

module.exports = router;
