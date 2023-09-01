const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
