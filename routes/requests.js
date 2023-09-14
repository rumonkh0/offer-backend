const path = require("path");
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
const multer = require("multer");
const Controller = require("../models/Controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, setFind, advancedResults(Request), getRequests)
  .post(protect, upload.any(), createRequest);
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
