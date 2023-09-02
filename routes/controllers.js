const express = require("express");
const Controller = require("../models/Controller");
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();
const {
  getControllers,
  getController,
  createController,
  updateController,
  deleteController,
} = require("../controllers/controllers");

const advancedResults = require("../middleware/advancedResults");
const requests = require("../routes/requests");
router.use("/:controllerId/requests", requests);

// app.use('/api/v1/bootcamps', bootcamps);
router
  .route("/")
  .get(advancedResults(Controller), getControllers)
  .post(protect, authorize("admin"), createController);
router
  .route("/:id")
  .get(getController)
  .put(updateController)
  .delete(deleteController);

module.exports = router;
