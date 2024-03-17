const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      maxLength: 200,
      minLength: 2,
      required: true,
    },
    ratings: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
