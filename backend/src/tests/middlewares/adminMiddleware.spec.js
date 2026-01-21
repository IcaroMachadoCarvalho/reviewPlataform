import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { isAdmin } from "../../middlewares/adminMiddleware";

// Jest não aceita aninhar matchers

afterEach(() => {
  jest.resetAllMocks();
});

describe("adminMiddleware", () => {
  it("Deve retornar acesso negado", () => {
    const reqMock = {
      user: { role: "user" },
    };

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    isAdmin(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(403);
    expect(resMock.json).toHaveBeenCalledWith({
      success: false,
      message: "Acesso negado precisa ter função admin",
      data: null,
    });

    expect(nextMock).not.toHaveBeenCalled();
  });

  it("Deve retornar acesso negado com user role null", () => {
    const reqMock = {
      user: {},
    };

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    isAdmin(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(403);
    expect(resMock.json).toHaveBeenCalledWith({
      success: false,
      message: "Acesso negado precisa ter função admin",
      data: null,
    });

    expect(nextMock).not.toHaveBeenCalled();
  });

  it("Deve chamar next com role admin", () => {
    const reqMock = {
      user: { role: "admin" },
    };

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    isAdmin(reqMock, resMock, nextMock);

    expect(resMock.status).not.toHaveBeenCalled();
    expect(resMock.json).not.toHaveBeenCalled();

    expect(nextMock).toHaveBeenCalledTimes(1);
  });
});
