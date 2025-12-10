import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
