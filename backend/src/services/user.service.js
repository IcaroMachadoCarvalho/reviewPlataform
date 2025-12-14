import { UserRepository } from "../repository/index.js";

export class UserService {
  static async getUserByUsername(username) {
    return UserRepository.getUserByUsername(username);
    // return getUserByUsername(username);
  }

  static async verifyIfUsernameOrEmailAlreadyInUse(username, email) {
    return UserRepository.getUserByUsernameOrEmail(username, email);
    // return getUserByUsernameOrEmail(username, email);
  }

  static async createUser(newUser) {
    return UserRepository.create(newUser);
    // return createUser(newUser);
  }
}
