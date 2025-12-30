import { Review } from "../models/index.js";
import mongoose from "mongoose";

export class ReviewRepository {
  static async createReview(reviewData) {
    return Review.create(reviewData);
  }

  static async getReviews(courseId, limit, skip) {
    return Review.find({ courseId: courseId })
      .populate("userId", "username") // Substitui o campo pelo valor selecionados no caso username
      .limit(limit)
      .skip(skip);
  }

  static async getAverageRating(courseId) {
    const result = await Review.aggregate([
      // Permite filtrar, agrupar, ordenar, calcular médias, somas, contar, fazer joins complexos, etc.
      { $match: { courseId: new mongoose.Types.ObjectId(courseId) } }, // filtro
      // Ele não aceita tipo string que nem find, tem que converter o object id do mongo
      {
        $group: {
          // retorno
          _id: "$courseId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    return {
      averageRating: result[0].averageRating,
      totalReviews: result[0].totalReviews,
    };
  }

  static async delete(idReview) {
    return Review.findByIdAndDelete(idReview);
  }
}
