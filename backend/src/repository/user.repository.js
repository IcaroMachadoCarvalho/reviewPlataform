import { User } from "../models/index.js";

export class UserRepository {
  static async getUserById(userId) {
    return User.findById(userId);
  }

  static async getUserByUsername(username) {
    return User.findOne({ username }).select("-email");
  }

  static async getUserByUsernameOrEmail(username, email) {
    return User.findOne({
      $or: [{ username }, { email }],
    }).select("-email");
  }

  static async create(newUser) {
    const { username, email, hashedPassword } = newUser;
    return User.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  static update(userId, userData) {
    return User.findOneAndUpdate(
      { _id: userId },
      { $set: userData },
      { new: true }
    );
  }

  static async block(userId) {
    return User.findOneAndUpdate(userId, {
      $set: {
        status: "blocked",
      },
    });
  }

  static async unblock(userId) {
    return User.findOneAndUpdate(userId, {
      $set: {
        status: "normal",
      },
    });
  }

  static async getUsers() {
    return User.find({}).select("-password");
  }
}
