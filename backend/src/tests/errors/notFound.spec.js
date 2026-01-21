import { jest, describe, it, expect, afterEach } from "@jest/globals";
import NotFound from "../../errors/notFound";
import BaseError from "../../errors/baseError";

afterEach(() => {
  jest.resetAllMocks();
});

describe("NotFoundError", () => {
  it("Deve instanciar com valores padrão", () => {
    const notFoundError = new NotFound();

    expect(notFoundError.message).toBe("Página não encontrada");
    expect(notFoundError.status).toBe(404);
    expect(notFoundError).toBeInstanceOf(BaseError);
    expect(notFoundError.success).toBe(false);
    expect(notFoundError.data).toBeNull();
  });

  it("Deve instanciar com valor de message inserido", () => {
    const messageMock = "teste";
    const notFoundError = new NotFound(messageMock);

    expect(notFoundError.message).toBe(messageMock);
    expect(notFoundError.status).toBe(404);
    expect(notFoundError.success).toBe(false);
    expect(notFoundError.data).toBeNull();
  });
});
