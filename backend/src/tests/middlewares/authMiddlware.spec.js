import { jest, describe, it, expect, afterEach } from "@jest/globals";
import jwt from "jsonwebtoken";
import authMiddleware from "../../middlewares/authMiddleware";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("authMiddleware", () => {
  it("Deve passar normalmente quando estiver com headers e token, além de chamar next", () => {
    const reqMock = {
      headers: {
        authorization: "Bearer fake-token",
      },
    };

    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, email: "test@test.com" });
    });
    // mockimplementation execute isso invés da original

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    authMiddleware(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(reqMock.user).toBeDefined();
  });

  it("Deve retornar status 401 sem header bearer de autorização", () => {
    const reqMock = {
      headers: {
        authorization: "fake-token",
      },
    };

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    authMiddleware(reqMock, resMock, nextMock);

    expect(resMock.status).toBeCalledWith(401);
    expect(resMock.json).toBeCalledWith({
      success: "false",
      message: "Usuário sem autorização",
      data: null,
    });
    expect(nextMock).not.toHaveBeenCalled();
    expect(reqMock.user).not.toBeDefined();
  });

  it("Deve retornar status 401 sem token no header de autorização", () => {
    const reqMock = {
      headers: {
        authorization: "Bearer",
      },
    };

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    authMiddleware(reqMock, resMock, nextMock);

    expect(resMock.status).toBeCalledWith(401);
    expect(resMock.json).toBeCalledWith({
      success: "false",
      message: "Usuário sem autorização",
      data: null,
    });
    expect(nextMock).not.toHaveBeenCalled();
    expect(reqMock.user).not.toBeDefined();
  });

  it("Deve passar normalmente quando estiver com headers e token, além de chamar next", () => {
    const reqMock = {
      headers: {
        authorization: "Bearer fake-token",
      },
    };

    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(true, null);
    });
    // mockimplementation execute isso invés da original

    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    authMiddleware(reqMock, resMock, nextMock);

    expect(resMock.status).toBeCalledWith(401);
    expect(resMock.json).toBeCalledWith({
      success: "false",
      message: "Token inválido",
      data: null,
    });
    expect(nextMock).not.toHaveBeenCalled();
    expect(reqMock.user).not.toBeDefined();
  });
});
