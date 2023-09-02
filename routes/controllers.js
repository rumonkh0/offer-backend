const express = require("express");
const router = express.Router();
const {
  getControllers,
  getController,
  createController,
  updateController,
  deleteController,
} = require("../controllers/controllers");

const requests = require('../routes/requests')
router.use('/:controllerId/requests', requests)

// app.use('/api/v1/bootcamps', bootcamps);
router.route("/").get(getControllers).post(createController);
router.route("/:id").get(getController).put(updateController).delete(deleteController);

module.exports = router;