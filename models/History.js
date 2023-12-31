const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
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
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
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
  requestedAt: Date,
  publishedAt: Date,
  historyAT: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", HistorySchema);
