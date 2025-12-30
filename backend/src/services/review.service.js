import { ReviewRepository } from "../repository/index.js";
export class ReviewService {
  static async create(reviewData) {
    return ReviewRepository.createReview(reviewData);
  }
  static async listReviewsBySection(courseId, limit, skip) {
    return ReviewRepository.getReviews(courseId, limit, skip);
  }

  static async getAverageRatingValue(courseId) {
    return ReviewRepository.getAverageRating(courseId);
  }

  static async deleteReview(idReview) {
    return ReviewRepository.delete(idReview);
  }
}
