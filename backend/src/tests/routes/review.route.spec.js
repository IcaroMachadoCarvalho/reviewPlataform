/* eslint-disable no-unused-vars */
import request from "supertest";
import { beforeEach, describe, it, expect, jest } from "@jest/globals";

await jest.unstable_mockModule("../../middlewares/index.js", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    req.user = { id: "fake-user-id", role: "admin" };
    next();
  }),
  isAdmin: jest.fn((req, res, next) => next()),
  validationMiddleware: jest.fn((req, res, next) => next()),
  errorMiddleware: jest.fn((err, req, res, next) => {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }),
  notFoundMiddleware: jest.fn((req, res) => {
    return res.status(404).json({
      success: false,
      message: "Not Found",
      data: null,
    });
  }),
}));

await jest.unstable_mockModule("../../services/index.js", () => ({
  ReviewService: {
    deleteReview: jest.fn(),
    create: jest.fn(),
  },

  // Stubs para não quebrar o app
  UserService: {},
  CourseService: {},
  AuthService: {},
}));

const { ReviewService } = await import("../../services/index.js");
const { default: app } = await import("../../app.js");
import BaseError from "../../errors/baseError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DELETE /api/reviews/:id", () => {
  it("deve remover o review", async () => {
    ReviewService.deleteReview.mockResolvedValue(null);

    const res = await request(app)
      .delete("/api/reviews/123")
      .set("Authorization", "Bearer fake");

    expect(res.status).toBe(200);
    expect(ReviewService.deleteReview).toHaveBeenCalledWith("123");
  });

  it("deve retornar 404 se review não existir", async () => {
    ReviewService.deleteReview.mockRejectedValue(
      new BaseError("Review não encontrada", 404),
    );

    const res = await request(app)
      .delete("/api/reviews/123")
      .set("Authorization", "Bearer fake");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/reviews", () => {
  it("deve criar um review", async () => {
    ReviewService.create.mockResolvedValue({ id: "1" });

    const res = await request(app)
      .post("/api/reviews")
      .send({
        userId: "123",
        courseId: "123",
        rating: 5,
        comment: "Muito bom",
      })
      .set("Authorization", "Bearer fake");

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Review criada com sucesso");
    expect(res.body.data).toEqual({ id: "1" });
    expect(ReviewService.create).toHaveBeenCalledWith({
      userId: "123",
      courseId: "123",
      rating: 5,
      comment: "Muito bom",
    });
  });
});
