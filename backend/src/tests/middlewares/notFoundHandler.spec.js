import { jest, describe, it, expect } from "@jest/globals";
import notFoundMiddleware from "../../middlewares/notFoundHandler";
import NotFound from "../../errors/notFound";

describe("notFoundHandler", () => {
  it("Deve chamar next com o erro notFound", () => {
    const reqMock = {};
    const resMock = {};
    const nextMock = jest.fn();

    notFoundMiddleware(reqMock, resMock, nextMock);
    expect(nextMock).toHaveBeenCalledWith(new NotFound());
  });
});
