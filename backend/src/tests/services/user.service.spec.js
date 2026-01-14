import { jest, describe, it, expect, afterEach } from "@jest/globals";
import bcrypt from "bcrypt";

await jest.unstable_mockModule("../../repository/index.js", () => ({
  UserRepository: {
    getUserByUsername: jest.fn(),
    getUserById: jest.fn(),
    getUserByUsernameOrEmail: jest.fn(),
    create: jest.fn(),
    block: jest.fn(),
    unblock: jest.fn(),
    getUsers: jest.fn(),
    update: jest.fn(),
  },
}));

await jest.unstable_mockModule("../../utils/generateToken.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const { UserService } = await import("../../services/user.service.js");
const { UserRepository } = await import("../../repository/index.js");
const generateTokenService = (await import("../../utils/generateToken.js"))
  .default;

import BaseError from "../../errors/baseError.js";

afterEach(() => {
  jest.resetAllMocks();
});

describe("UserService.login", () => {
  it("deve retornar usuário e token quando credenciais são válidas", async () => {
    const loginData = { username: "testuser", password: "password123" };

    const mockUser = {
      _id: "123",
      username: "testuser",
      password: "hashedPassword",
      role: "user",
      toObject: jest.fn().mockReturnValue({
        _id: "123",
        username: "testuser",
        role: "admin",
      }),
    };

    UserRepository.getUserByUsername.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    generateTokenService.mockReturnValue("fake-jwt-token");

    const result = await UserService.login(loginData);

    expect(result.token).toBe("fake-jwt-token");
    expect(UserRepository.getUserByUsername).toHaveBeenCalledWith("testuser");
  });

  it("deve retornar erro quando os dados forem vazios", async () => {
    const loginData = {};

    UserRepository.getUserByUsername.mockResolvedValue(null);

    await expect(UserService.login(loginData)).rejects.toThrowError(
      new BaseError("Credenciais inválidas", 400)
    );
  });

  it("deve retornar erro quando a senha for diferente", async () => {
    const loginData = { username: "testuser", password: "password123" };
    const mockUser = {
      _id: "123",
      username: "testuser",
      password: "hashedPassword",
      role: "admin",
      toObject: jest.fn().mockReturnValue({
        _id: "123",
        username: "testuser",
        role: "admin",
      }),
    };
    UserRepository.getUserByUsername.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await expect(UserService.login(loginData)).rejects.toThrowError(
      new BaseError("Credenciais inválidas", 400)
    );
  });
});

describe("UserService.register", () => {
  it("deve criar usuário com dados corretos", async () => {
    const registerData = {
      username: "teste",
      email: "teste@gmail.com",
      password: "passwird123",
    };

    UserRepository.getUserByUsernameOrEmail.mockResolvedValue(null);

    const bcryptGenSalt = jest.spyOn(bcrypt, "genSalt");
    jest.spyOn(bcrypt, "hash").mockResolvedValue("fake-hash");

    UserRepository.create.mockResolvedValue({});

    await UserService.register(registerData);

    expect(bcryptGenSalt).toBeCalledWith(10);
    expect(UserRepository.create).toHaveBeenCalledWith({
      username: "teste",
      email: "teste@gmail.com",
      hashedPassword: "fake-hash",
    });
  });

  it("deve lançar erro ao encontrar usuário pelo email ou nome de usuário", async () => {
    const registerData = {
      username: "teste",
      email: "teste@gmail.com",
      password: "passwird123",
    };
    const bcryptHashSpy = jest.spyOn(bcrypt, "hash");
    UserRepository.getUserByUsernameOrEmail.mockResolvedValue({});
    await expect(UserService.register(registerData)).rejects.toThrowError(
      new BaseError("Credenciais inválidas", 400)
    );

    expect(bcryptHashSpy).not.toHaveBeenCalled();
    expect(UserRepository.create).not.toBeCalled();
  });
});
describe("UserService.getUserByUsername", () => {
  it("deve chamar o repository com os parâmetros", async () => {
    const usernameMock = "teste";
    await UserService.getUserByUsername(usernameMock);

    expect(UserRepository.getUserByUsername).toBeCalledWith(usernameMock);
  });
});

describe("UserService.verifyIfUsernameOrEmailAlreadyInUse", () => {
  it("deve chamar o repository com os parâmetros", async () => {
    const usernameMock = "teste";
    const emailMock = "teste";
    await UserService.verifyIfUsernameOrEmailAlreadyInUse(
      usernameMock,
      emailMock
    );

    expect(UserRepository.getUserByUsernameOrEmail).toBeCalledWith(
      usernameMock,
      emailMock
    );
  });
});

describe("UserService.createUser", () => {
  it("deve chamar o repository.create com os parâmetros", async () => {
    const createUserMock = {
      username: "teste",
      email: "teste@gmail.com",
      hashedPassword: "....",
    };
    await UserService.createUser(createUserMock);

    expect(UserRepository.create).toBeCalledWith(createUserMock);
  });
});

describe("UserService.updateUser", () => {
  it("deve chamar o repository.update", async () => {
    const updateUserMock = {
      username: "teste",
      email: "teste@gmail.com",
      password: "passwordteste",
      role: "admin",
    };
    const idMock = "1";

    const bcryptGenSalt = jest
      .spyOn(bcrypt, "genSalt")
      .mockResolvedValue("fake-salt");
    const bcryptHashSpy = jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValue("fake-hash");
    UserRepository.getUserByUsernameOrEmail.mockResolvedValue(null);

    await UserService.updateUser(idMock, updateUserMock);

    expect(bcryptGenSalt).toBeCalledWith(10);

    expect(bcryptHashSpy).toBeCalledWith("passwordteste", "fake-salt");

    expect(UserRepository.update).toBeCalledWith(idMock, {
      username: "teste",
      email: "teste@gmail.com",
      password: "fake-hash",
    });

    const updateCallArgs = UserRepository.update.mock.calls[0][1]; // Argumentos passados para o update // [] deve ser as chamadas, [] parâmetros
    expect(updateCallArgs).not.toHaveProperty("role");
  });

  it("deve lançar erro no repository.update se achar nome usuário ou e-mail em uso", async () => {
    const updateUserMock = {
      username: "teste",
      email: "teste@gmail.com",
      password: "....",
    };
    const idMock = "1";

    UserRepository.getUserByUsernameOrEmail.mockResolvedValue({});

    expect(UserRepository.update).not.toBeCalledWith(updateUserMock);

    await expect(
      UserService.updateUser(idMock, updateUserMock)
    ).rejects.toThrowError(new BaseError("Credenciais já em uso", 400));
  });
});

describe("UserService.updateRole", () => {
  it("deve atualizar o atributo função do usuário", async () => {
    const userIdMock = "1";
    const roleUserMock = "admin";
    UserRepository.update.mockResolvedValue({});
    await UserService.updateRole(userIdMock, roleUserMock);
    expect(UserRepository.update).toBeCalledWith(
      userIdMock,
      expect.objectContaining({ role: "admin" })
    );
  });
});

describe("UserService.blockUser", () => {
  it("deve chamar o repository.block com os parâmetros", async () => {
    const userIdMock = "1";

    UserRepository.getUserById.mockResolvedValue({});
    await UserService.blockUser(userIdMock);

    expect(UserRepository.block).toBeCalledWith(userIdMock);
  });

  it("deve lançar erro se não encontrar usuário", async () => {
    const userIdMock = "1";

    UserRepository.getUserById.mockResolvedValue(null);
    await expect(UserService.blockUser(userIdMock)).rejects.toThrowError(
      new BaseError("Usuário não encontrado", 404)
    );
    expect(UserRepository.block).not.toBeCalledWith(userIdMock);
  });
});

describe("UserService.unblockUser", () => {
  it("deve chamar o repository.unblock com os parâmetros", async () => {
    const userIdMock = "1";

    UserRepository.getUserById.mockResolvedValue({});
    await UserService.unblockUser(userIdMock);

    expect(UserRepository.unblock).toBeCalledWith(userIdMock);
  });

  it("deve lançar erro se não encontrar usuário", async () => {
    const userIdMock = "1";

    UserRepository.getUserById.mockResolvedValue(null);
    await expect(UserService.unblockUser(userIdMock)).rejects.toThrowError(
      new BaseError("Usuário não encontrado", 404)
    );
    expect(UserRepository.unblock).not.toBeCalledWith(userIdMock);
  });
});

describe("UserService.getUsers", () => {
  it("deve chamar o repository.getUsers com os parâmetros", async () => {
    await UserService.getUsers();

    expect(UserRepository.getUsers).toBeCalled();
  });
});
