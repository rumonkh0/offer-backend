const mongoose = require("mongoose");

const ControllerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      // trim: true,
      maxlength: [20, "Name can not be more than 20 characters"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
      enum: ["admin", "moderator"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ControllerSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "createdBy",
  justOne: false,
});

module.exports = mongoose.model("Controller", ControllerSchema);
