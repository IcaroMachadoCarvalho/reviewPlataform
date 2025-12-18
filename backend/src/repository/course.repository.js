import { Course } from "../models/index.js";

export class CourseRepository {
  static async create(newUser) {
    return Course.create(newUser);
  }

  static async getCourses(query) {
    const data = Course.aggregate(query);
    return data;
  }

  static async getCourseById(id) {
    return Course.findById({ _id: id }).select("-__v");
  }

  static async update(id, updatedFields) {
    return Course.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    ).exec();
    // Tem certas situações tem uma promise tipo no get e por ai vai provalvelmente no find por ter tamanho variável
  }

  static async delete(id) {
    return Course.findByIdAndDelete(id);
  }
}
