import { jest, describe, it, expect, afterEach } from "@jest/globals";
import BaseError from "../../errors/baseError";
afterEach(() => {
  jest.resetAllMocks();
});

describe("BaseError", () => {
  it("Deve instanciar error com valores padrões", () => {
    const errorMock = new BaseError();

    const resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    errorMock.sendResponse(resMock);

    expect(errorMock.message).toBe("Erro interno do servidor");
    expect(errorMock.status).toBe(500);
    expect(errorMock.success).toBe(false);
    expect(errorMock.data).toBeNull();

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.send).toHaveBeenCalledWith({
      success: false,
      message: "Erro interno do servidor",
      data: null,
    });
  });

  it("Deve instanciar error com valores inseridos", () => {
    const valoresErrorMock = {
      message: "teste",
      status: 400,
      success: true,
      data: true,
    };
    const errorMock = new BaseError(
      valoresErrorMock.message,
      valoresErrorMock.status,
      valoresErrorMock.success,
      valoresErrorMock.data
    );

    const resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    errorMock.sendResponse(resMock);

    expect(errorMock.message).toBe(valoresErrorMock.message);
    expect(errorMock.status).toBe(valoresErrorMock.status);
    expect(errorMock.success).toBe(valoresErrorMock.success);
    expect(errorMock.data).toBe(valoresErrorMock.data);

    expect(resMock.status).toHaveBeenCalledWith(valoresErrorMock.status);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith({
      success: valoresErrorMock.success,
      message: valoresErrorMock.message,
      data: valoresErrorMock.data,
    });
    expect(resMock.send).toHaveBeenCalledTimes(1);
  });
});
