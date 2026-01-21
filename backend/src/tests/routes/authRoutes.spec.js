import request from "supertest";
import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import BaseError from "../../errors/baseError.js";

await jest.unstable_mockModule("../../services/user.service.js", () => ({
  UserService: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

const { UserService } = await import("../../services/user.service.js");
const { default: app } = await import("../../app.js");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Testando rota login (POST)", () => {
  it("O login deve possuir username e senha para se autenticar", async () => {
    const loginMock = {
      username: "teste5",
      password: "teste1234",
    };
    UserService.login.mockResolvedValue({
      userData: {
        _id: "1",
      },
      token: "fake-token",
    });
    const response = await request(app).post("/api/auth/login").send(loginMock);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it("O login deve retornar erro quando username não for encontrado", async () => {
    const loginMock = {
      username: "teste14",
      password: "teste1234",
    };
    UserService.login.mockRejectedValue(
      new BaseError("Credenciais inválidas", 400)
    );
    const response = await request(app).post("/api/auth/login").send(loginMock);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.data).toBeNull();
  });

  // Executa um de cada vez
  // test.each([
  //   [entrada1, entrada2, resultadoEsperado],
  //   [entrada1, entrada2, resultadoEsperado],
  // ])("descrição do teste", (a, b, esperado) => {
  //   expect(funcao(a, b)).toBe(esperado);
  // });

  describe("Validações da rota login (POST)", () => {
    it.each([
      [
        "quando username não for informado",
        { password: "teste1234" },
        "username",
        "O username precisa ser informado para a operação",
      ],
      [
        "quando username tiver menos de 3 caracteres",
        { username: "te", password: "teste1234" },
        "username",
        "O nome de usuário deve ter pelo menos 3 caracteres",
      ],
      [
        "quando password não for informada",
        { username: "teste2" },
        "password",
        "A senha precisa ser informado para a operação",
      ],
      [
        "quando password tiver menos de 6 caracteres",
        { username: "teste2", password: "12345" },
        "password",
        "A senha deve ter pelo menos 6 caracteres",
      ],
    ])("deve retornar erro 400 %s", async (_, body, field, message) => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(body)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.data).toBeNull();

      const error = response.body.errors.find((err) => err.path === field);

      expect(error).toBeDefined();
      expect(error.msg).toBe(message);
      expect(UserService.login).not.toBeCalled();
    });
  });
});

describe("Testando rota register (POST)", () => {
  it("O register deve retornar status 201 quando tudo estiver certo", async () => {
    const registerMock = {
      username: "testes",
      email: "teste@gmail.com",
      password: "password12345",
    };
    UserService.register.mockResolvedValue({});
    const response = await request(app)
      .post("/api/auth/register")
      .send(registerMock)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeNull();
  });

  it("O register deve retornar status 400 e lançar erro quando tiver registro existente", async () => {
    const registerMock = {
      username: "testes",
      email: "teste@gmail.com",
      password: "password12345",
    };
    UserService.register.mockRejectedValue(
      new BaseError("Credenciais inválidas", 400)
    );
    const response = await request(app)
      .post("/api/auth/register")
      .send(registerMock)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.data).toBeNull();
  });

  describe("Validações da rota register (POST)", () => {
    it.each([
      [
        "quando username não for informado",
        { email: "teste@gmail.com", password: "password12345" },
        "username",
        "O username precisa ser informado para a operação",
      ],
      [
        "quando username tiver menos de 6 caracteres",
        {
          username: "tes",
          email: "teste@gmail.com",
          password: "password12345",
        },
        "username",
        "O nome de usuário deve conter pelo menos 6 caracteres",
      ],
      [
        "quando email não for informado",
        { username: "testes", password: "password12345" },
        "email",
        "O email precisa ser informado para a operação",
      ],
      [
        "quando email for inválido",
        { username: "testes", email: "test", password: "password12345" },
        "email",
        "Por favor insira um email válido",
      ],
      [
        "quando password não for informada",
        { username: "testes", email: "teste@gmail.com" },
        "password",
        "A senha precisa ser informado para a operação",
      ],
      [
        "quando password tiver menos de 6 caracteres",
        { username: "testes", email: "teste@gmail.com", password: "passw" },
        "password",
        "A senha deve ter pelo menos 6 caracteres",
      ],
    ])("deve retornar erro 400 %s", async (_, body, field, message) => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(body)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.data).toBeNull();

      const error = response.body.errors.find((err) => err.path === field);

      expect(error).toBeDefined();
      expect(error.msg).toBe(message);
      expect(UserService.register).not.toBeCalled();
    });
  });
});
