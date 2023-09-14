const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      // trim: true,
      maxlength: [20, "Name can not be more than 20 characters"],
    },
    details: {
      type: String,
      trim: true,
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    image: String,
    url: {
      type: String,
      match: [
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    category: {
      type: [String],
    },
    offer_tag: String,
    off: String,
    regular_price: String,
    offer_price: String,
    free_shipping: Boolean,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Controller",
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Controller",
      required: true,
    },
    createdAt: Date,
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("history", {
  ref: "History",
  localField: "_id",
  foreignField: "productId",
  justOne: false,
});

module.exports = mongoose.model("Product", ProductSchema);
