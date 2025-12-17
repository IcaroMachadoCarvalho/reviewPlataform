import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: ObjectId,
      ref: "Course",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Review = mongoose.model("review", reviewSchema);

export default Review;
