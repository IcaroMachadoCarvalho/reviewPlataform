import { jest, describe, it, expect, afterEach } from "@jest/globals";

afterEach(() => {
  jest.resetAllMocks();
});

jest.unstable_mockModule("express-validator", () => ({
  validationResult: jest.fn(),
}));

const { validationResult } = await import("express-validator");
const validationMiddleware = (
  await import("../../middlewares/validationMiddleware")
).default;

describe("validationMiddleware", () => {
  it("Deve chamar next se tudo certo", () => {
    const reqMock = {};
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    validationMiddleware(reqMock, resMock, nextMock);
    expect(resMock.status).not.toHaveBeenCalled();
    expect(resMock.json).not.toHaveBeenCalled();
    expect(nextMock).toBeCalledTimes(1);
  });

  it("Deve retornar resposta ao pelo menos um erro de validação", () => {
    const reqMock = {};
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const nextMock = jest.fn();

    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: "Campo inválido" }],
    });

    validationMiddleware(reqMock, resMock, nextMock);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith({
      success: false,
      message: "Um ou mais dados fornecidos estão incorretos",
      data: null,
      errors: [{ msg: "Campo inválido" }],
    });
    expect(nextMock).not.toBeCalledTimes(1);
  });
});
