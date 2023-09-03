const express = require("express");
const Controller = require("../models/Controller");
const { protect, authorize } = require("../middleware/auth");
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
const products = require("../routes/products");
router.use("/:controllerId/requests", requests);
router.use("/:controllerId/products", products);

// app.use('/api/v1/bootcamps', bootcamps);
router
  .route("/")
  .get(protect, authorize("admin"), advancedResults(Controller), getControllers)
  .post(protect, authorize("admin"), createController);
router
  .route("/:id")
  .get(protect, getController)
  .put(protect, updateController)
  .delete(protect, authorize("admin"), deleteController);

module.exports = router;
