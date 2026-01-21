import { jest, describe, it, expect, afterEach } from "@jest/globals";

await jest.unstable_mockModule("../../repository/review.repository.js", () => ({
  ReviewRepository: {
    createReview: jest.fn(),
    listReviewsBySection: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    getReviews: jest.fn(),
    getAverageRating: jest.fn(),
  },
}));
await jest.unstable_mockModule("../../repository/course.repository.js", () => ({
  CourseRepository: {
    getCourseById: jest.fn(),
  },
}));

const { ReviewService } = await import("../../services/review.service.js");
const { ReviewRepository } =
  await import("../../repository/review.repository.js");
const { CourseRepository } =
  await import("../../repository/course.repository.js");
import BaseError from "../../errors/baseError.js";

afterEach(() => {
  jest.resetAllMocks();
});

describe("reviewService.create", () => {
  it("Deve chamar método create", async () => {
    const createReviewDataMock = {
      courseId: "idtest",
      rating: 4,
    };
    ReviewRepository.createReview.mockResolvedValue();
    await ReviewService.create(createReviewDataMock);
    expect(ReviewRepository.createReview).toHaveBeenCalledWith(
      createReviewDataMock,
    );
    expect(ReviewRepository.createReview).toHaveBeenCalledTimes(1);
  });
});

describe("reviewService.listReviewsBySection", () => {
  it("Deve chamar método listReviewsBySection", async () => {
    const courseIdMock = "fakeId";
    const limitMock = 10;
    const skipMock = 0;
    CourseRepository.getCourseById.mockResolvedValue({
      _id: "fakeId",
    });
    await ReviewService.listReviewsBySection(courseIdMock, limitMock, skipMock);
    expect(ReviewRepository.getReviews).toHaveBeenCalledWith(
      courseIdMock,
      limitMock,
      skipMock,
    );
    expect(ReviewRepository.getReviews).toHaveBeenCalledTimes(1);
  });

  it("Deve lançar erro se não encontrar curso", async () => {
    const courseIdMock = "fakeId";
    const limitMock = 10;
    const skipMock = 0;
    CourseRepository.getCourseById.mockResolvedValue(null);
    await expect(
      ReviewService.listReviewsBySection(courseIdMock, limitMock, skipMock),
    ).rejects.toThrowError(new BaseError("Curso não encontrado", 404));
    expect(ReviewRepository.getReviews).not.toHaveBeenCalled();
  });
});

describe("reviewService.getAverageRatingValue", () => {
  it("Deve chamar método getAverageRatingValue", async () => {
    const courseIdMock = "fakeId";
    CourseRepository.getCourseById.mockResolvedValue({
      _id: "fakeId",
    });
    await ReviewService.getAverageRatingValue(courseIdMock);
    expect(ReviewRepository.getAverageRating).toHaveBeenCalledWith(
      courseIdMock,
    );
    expect(ReviewRepository.getAverageRating).toHaveBeenCalledTimes(1);
  });

  it("Deve lançar erro se não encontrar curso", async () => {
    const courseIdMock = "fakeId";
    CourseRepository.getCourseById.mockResolvedValue(null);
    await expect(
      ReviewService.getAverageRatingValue(courseIdMock),
    ).rejects.toThrowError(new BaseError("Curso não encontrado", 404));
    expect(ReviewRepository.getAverageRating).not.toHaveBeenCalled();
  });
});

describe("reviewService.deleteReview", () => {
  it("Deve chamar método deleteReview", async () => {
    const deleteReviewIdMock = "fake-id";
    ReviewRepository.findById.mockResolvedValue({});
    ReviewRepository.delete.mockResolvedValue();
    await ReviewService.deleteReview(deleteReviewIdMock);
    expect(ReviewRepository.delete).toHaveBeenCalledWith(deleteReviewIdMock);
    expect(ReviewRepository.delete).toHaveBeenCalledTimes(1);
  });

  it("Deve lançar erro se não encontrar a review", async () => {
    const deleteReviewIdMock = "fake-id";
    ReviewRepository.findById.mockResolvedValue(false);
    ReviewRepository.delete.mockResolvedValue();
    await expect(
      ReviewService.deleteReview(deleteReviewIdMock),
    ).rejects.toThrowError(new BaseError("Review não encontrada", 404));
    expect(ReviewRepository.delete).not.toHaveBeenCalled();
  });
});
