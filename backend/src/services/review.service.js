import BaseError from "../errors/baseError.js";
import { ReviewRepository } from "../repository/index.js";
import CourseService from "./course.service.js";
export class ReviewService {
  static async create(reviewData) {
    return ReviewRepository.createReview(reviewData);
  }
  static async listReviewsBySection(courseId, limit, skip) {
    await CourseService.findById(courseId);
    return ReviewRepository.getReviews(courseId, limit, skip);
  }

  static async getAverageRatingValue(courseId) {
    await CourseService.findById(courseId);
    return ReviewRepository.getAverageRating(courseId);
  }

  static async deleteReview(idReview) {
    const review = await ReviewRepository.findById(idReview);
    if (!review) throw new BaseError("Review não encontrada", 404);

    return ReviewRepository.delete(idReview);
  }
}
