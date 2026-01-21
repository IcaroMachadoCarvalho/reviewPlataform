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
  UserService: {
    blockUser: jest.fn(),
    unblockUser: jest.fn(),
    updateUser: jest.fn(),
    updateRole: jest.fn(),
    getUsers: jest.fn(),
  },
  CourseService: {},
  ReviewService: {},
  AuthService: {},
}));

const { UserService } = await import("../../services/index.js");
const { default: app } = await import("../../app.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PATCH /api/users/:id/block", () => {
  it("Deve bloquear um usuário", async () => {
    UserService.blockUser.mockResolvedValue(null);
    const response = await request(app).patch("/api/users/123/block");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Usuário bloqueado com sucesso!");
    expect(response.body.data).toBeNull();
  });
});

describe("PATCH /api/users/:id/unblock", () => {
  it("Deve desbloquear um usuário", async () => {
    UserService.unblockUser.mockResolvedValue(null);
    const response = await request(app).patch("/api/users/123/unblock");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Usuário desbloqueado com sucesso!");
    expect(response.body.data).toBeNull();
  });
});

describe("PATCH /api/users", () => {
  it("Deve atualizar dados de um usuário", async () => {
    UserService.updateUser.mockResolvedValue(null);
    const response = await request(app).patch("/api/users").send({
      name: "Nome do usuário",
      email: "E-mail do usuário",
      password: "Senha do usuário",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Usuário atualizado com sucesso!");
    expect(response.body.data).toBeNull();
    expect(UserService.updateUser).toHaveBeenCalledWith(
      "fake-user-id",
      expect.objectContaining({
        name: "Nome do usuário",
        email: "E-mail do usuário",
        password: "Senha do usuário",
      }),
    );
  });
});

describe("PATCH /api/users/role", () => {
  it("Deve atualizar o papel de um usuário", async () => {
    UserService.updateRole.mockResolvedValue(null);
    const response = await request(app).patch("/api/users/role").send({
      userId: "123",
      role: "admin",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Usuário atualizado com sucesso!");
    expect(response.body.data).toBeNull();
    expect(UserService.updateRole).toHaveBeenCalledWith("123", "admin");
  });
});

describe("GET /api/users", () => {
  it("Deve retornar a lista de usuários", async () => {
    UserService.getUsers.mockResolvedValue([]);
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Lista de usuários obtidos com sucesso!",
    );
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
