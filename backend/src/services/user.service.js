import BaseError from "../errors/baseError.js";
import { UserRepository } from "../repository/index.js";

export class UserService {
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
    return UserRepository.update(userId, userData);
  }

  static async updateRole(userId, role) {
    return UserRepository.update(userId, { role });
  }

  static async blockUser(userId) {
    const userExists = UserRepository.getUserById(userId);
    if (userExists) {
      return UserRepository.block(userId);
    }

    throw new BaseError("Credencial inválida", 404);
  }

  static async unblockUser(userId) {
    const userExists = UserRepository.getUserById(userId);
    if (userExists) {
      return UserRepository.unblock(userId);
    }

    throw new BaseError("Credencial inválida", 404);
  }

  static async getUsers() {
    return UserRepository.getUsers();
  }
}
