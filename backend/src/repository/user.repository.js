import { User } from "../models/index.js";

export class UserRepository {
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
    console.log(hashedPassword);
    return User.create({
      username,
      email,
      password: hashedPassword,
    });
  }
}

export const getUserByUsername = async (username) => {
  return User.findOne({ username }).select("-email");
  // Select nesse caso remove campos coloquei para remover dados sensíveis
};

export const getUserByUsernameOrEmail = async (username, email) => {
  return User.findOne({
    $or: [{ username }, { email }],
  }).select("-email");
};

export const createUser = async (newUser) => {
  const { username, email, hashedPassword } = newUser;
  console.log(hashedPassword);
  return User.create({
    username,
    email,
    password: hashedPassword,
  });
};
