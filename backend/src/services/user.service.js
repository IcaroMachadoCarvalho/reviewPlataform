import bcrypt from "bcrypt";
import BaseError from "../errors/baseError.js";
import { UserRepository } from "../repository/index.js";
import generateTokenService from "../utils/generateToken.js";

export class UserService {
  static async login(data) {
    const { username, password } = data;

    const user = await this.getUserByUsername(username);

    if (!user) throw new BaseError("Credenciais inválidas", 400);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new BaseError("Credenciais inválidas", 400);

    // Geração do token
    const userObj = user.toObject(); // converte para objeto js
    delete userObj.password; // Remove o campo password pois em cima tinha que verificar que é valido
    const token = generateTokenService(user._id, username, user.role);
    return { userData: userObj, token: token };
  }

  static async register(data) {
    const { username, email, password } = data;
    const isUsernameOrEmailAlreadyInUse =
      await this.verifyIfUsernameOrEmailAlreadyInUse(username, email);

    if (isUsernameOrEmailAlreadyInUse) {
      throw new BaseError("Credenciais inválidas", 400);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    await UserService.createUser({
      username,
      email,
      hashedPassword,
    });
  }

  static async getUserByUsername(username) {
    return UserRepository.getUserByUsername(username);
  }

  static async verifyIfUsernameOrEmailAlreadyInUse(username, email) {
    return UserRepository.getUserByUsernameOrEmail(username, email);
  }

  static async createUser(newUser) {
    return UserRepository.create(newUser);
  }

  static async updateUser(userId, userData) {
    const updatedUserData = userData;

    const isUsernameOrEmailAlreadyInUse =
      await this.verifyIfUsernameOrEmailAlreadyInUse(
        updatedUserData.username,
        updatedUserData.email
      );
    if (isUsernameOrEmailAlreadyInUse) {
      throw new BaseError("Credenciais já em uso", 400);
    }

    if (updatedUserData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatedUserData.password, salt);
      updatedUserData.password = hashedPassword;
    }
    if (userData.role) delete userData.role;
    return UserRepository.update(userId, updatedUserData);
  }

  static async updateRole(userId, role) {
    return UserRepository.update(userId, { role });
  }

  static async blockUser(userId) {
    const userExists = await UserRepository.getUserById(userId);
    if (userExists) {
      return UserRepository.block(userId);
    }

    throw new BaseError("Usuário não encontrado", 404);
  }

  static async unblockUser(userId) {
    const userExists = await UserRepository.getUserById(userId);
    if (userExists) {
      return UserRepository.unblock(userId);
    }

    throw new BaseError("Usuário não encontrado", 404);
  }

  static async getUsers() {
    return UserRepository.getUsers();
  }
}
