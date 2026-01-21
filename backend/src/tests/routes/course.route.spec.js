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
  CourseService: {
    listCourseRanking: jest.fn(),
    findById: jest.fn(),
    filterCourse: jest.fn(),
    postCourse: jest.fn(),
    patchCourse: jest.fn(),
    removeCourse: jest.fn(),
  },
  ReviewService: {
    listReviewsBySection: jest.fn(),
    getAverageRatingValue: jest.fn(),
  },
  UserService: {},
  AuthService: {},
}));

await jest.unstable_mockModule("../../models/course.model.js", () => ({
  default: {
    countDocuments: jest.fn(),
  },
}));

const { CourseService } = await import("../../services/index.js");
const { ReviewService } = await import("../../services/index.js");
const { default: app } = await import("../../app.js");
const { Course } = await import("../../models/index.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/courses/ranking", () => {
  it("Deve retornar o ranking de cursos", async () => {
    CourseService.listCourseRanking.mockResolvedValue([]);
    const response = await request(app).get("/api/courses/ranking");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Cursos com maior avaliação listadas com sucesso",
    );
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("GET /api/courses/:id", () => {
  it("Deve retornar o curso pelo id", async () => {
    CourseService.findById.mockResolvedValue({
      _id: "123",
      name: "Curso 1",
      description: "Descrição do curso 1",
      image: "https://example.com/curso1.jpg",
      price: 100,
    });
    const response = await request(app).get("/api/courses/123");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Busca de Curso/Produto/Evento por id realizada com sucesso!",
    );
    expect(response.body.data).toBeDefined();
    expect(CourseService.findById).toHaveBeenCalledWith("123");
  });
});

describe("GET /api/courses/:id/reviews", () => {
  it("Deve retornar as reviews pelo id do curso", async () => {
    ReviewService.getAverageRatingValue.mockResolvedValue({
      averageRating: 4.5,
      totalReviews: 2,
    });
    ReviewService.listReviewsBySection.mockResolvedValue([
      {
        _id: "123",
        name: "Curso 1",
        description: "Descrição do curso 1",
        image: "https://example.com/curso1.jpg",
        price: 100,
      },
      {
        _id: "123",
        name: "Curso 1",
        description: "Descrição do curso 1",
        image: "https://example.com/curso1.jpg",
        price: 100,
      },
    ]);
    const response = await request(app).get(
      "/api/courses/123/reviews?page=1&limit=10",
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Reviews listadas com sucesso");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
    expect(response.body.averageRating).toBe(4.5);
    expect(response.body.totalDocuments).toBe(2);
    expect(ReviewService.listReviewsBySection).toHaveBeenCalledWith(
      "123",
      10,
      0,
    );
    expect(ReviewService.getAverageRatingValue).toHaveBeenCalledWith("123");
  });
});

describe("GET /api/courses", () => {
  it("Deve retornar os cursos", async () => {
    CourseService.filterCourse.mockResolvedValue([
      {
        _id: "123",
        name: "Curso 1",
        description: "Descrição do curso 1",
        image: "https://example.com/curso1.jpg",
        price: 100,
      },
      {
        _id: "123",
        name: "Curso 1",
        description: "Descrição do curso 1",
        image: "https://example.com/curso1.jpg",
        price: 100,
      },
    ]);
    Course.countDocuments.mockResolvedValue(2);
    const response = await request(app).get(
      "/api/courses?page=1&limit=10&rating=4&title=curso&category=curso",
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Busca de Cursos/Produtos/Eventos realizada com sucesso!",
    );
    expect(Array.isArray(response.body.data)).toBeDefined();
    expect(response.body.data.length).toBe(2);
    expect(CourseService.filterCourse).toHaveBeenCalledWith(
      "curso",
      "curso",
      0,
      10,
      4,
    );
  });
});

describe("POST /api/courses", () => {
  it("Deve criar um curso", async () => {
    CourseService.postCourse.mockResolvedValue({
      title: "Curso 1",
      name: "Curso 1",
      description: "Descrição do curso 1",
      imageUrl: "fake-url",
      createdBy: "fake-user-id",
    });
    const response = await request(app).post("/api/courses").send({
      title: "Curso 1",
      name: "Curso 1",
      description: "Descrição do curso 1",
      category: "Curso",
      imageUrl: "fake-url",
    });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Curso/Evento/Produto criado com sucesso!",
    );
    expect(response.body.data).toBeDefined();
    expect(CourseService.postCourse).toHaveBeenCalledWith({
      title: "Curso 1",
      name: "Curso 1",
      description: "Descrição do curso 1",
      category: "Curso",
      imageUrl: "fake-url",
      createdBy: "fake-user-id",
    });
  });
});

describe("PATCH /api/courses/:id", () => {
  it("Deve atualizar um curso", async () => {
    CourseService.patchCourse.mockResolvedValue({
      _id: "123",
      title: "Curso 1",
      description: "Descrição do curso 1",
      category: "Curso",
      imagUrl: "fake-url",
    });
    const response = await request(app).patch("/api/courses/123").send({
      title: "Curso 1",
      description: "Descrição do curso 1",
      category: "Curso",
      imageUrl: "fake-url",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Curso/Produto/Evento atualizada com sucesso",
    );
    expect(response.body.data).toBeDefined();
    expect(CourseService.patchCourse).toHaveBeenCalledWith(
      "123",
      "Curso 1",
      "Descrição do curso 1",
      "Curso",
      "fake-url",
    );
  });
});

describe("DELETE /api/courses/:id", () => {
  it("Deve deletar um curso", async () => {
    CourseService.removeCourse.mockResolvedValue(null);
    const response = await request(app).delete("/api/courses/123");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Curso/Evento/Produto Apagado com sucesso!",
    );
    expect(CourseService.removeCourse).toHaveBeenCalledWith("123");
  });
});
