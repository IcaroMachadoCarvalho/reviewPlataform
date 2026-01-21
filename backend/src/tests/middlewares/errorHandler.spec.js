import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { errorMiddleware } from "../../middlewares";
import NotFound from "../../errors/notFound";
import BaseError from "../../errors/baseError";

afterEach(() => {
  jest.resetAllMocks();
});

describe("ErrorHandler", () => {
  it("Deve retornar resposta se o erro for do tipo notFound", () => {
    const reqMock = {};

    const resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const nextMock = jest.fn();
    const errorMock = new NotFound();
    const sendResponseSpy = jest.spyOn(errorMock, "sendResponse");
    errorMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(sendResponseSpy).toHaveBeenCalledWith(resMock);
    expect(sendResponseSpy).toHaveBeenCalledTimes(1);
  });
  it("Deve retornar resposta se o erro for do tipo BaseError", () => {
    const reqMock = {};

    const resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const nextMock = jest.fn();
    const errorMock = new BaseError();
    const sendResponseSpy = jest.spyOn(errorMock, "sendResponse");
    errorMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(sendResponseSpy).toHaveBeenCalledWith(resMock);
    expect(sendResponseSpy).toHaveBeenCalledTimes(1);
  });
  it("Deve retornar resposta se o erro não for de nenhum dos instâncias definidas", () => {
    const reqMock = {};

    const resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const nextMock = jest.fn();
    const errorMock = {};
    const sendResponseSpy = jest.spyOn(BaseError.prototype, "sendResponse");
    // Prototype é onde ficam os métodos da classe, usados por qualquer instância, mesmo que ela não esteja salva em uma variável.
    errorMiddleware(errorMock, reqMock, resMock, nextMock);

    expect(sendResponseSpy).toHaveBeenCalledWith(resMock);
    expect(sendResponseSpy).toHaveBeenCalledTimes(1);
  });
});
