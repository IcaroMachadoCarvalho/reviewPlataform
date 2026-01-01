import { body, param } from "express-validator";
import BaseError from "../errors/baseError.js";

export const updateUserValidator = [
  body("username")
    .optional()
    .escape()
    .trim()
    .notEmpty()
    .withMessage("O username precisa ser informado para a operação")
    .isLength({ min: 3 })
    .withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("O email precisa ser informado para a operação")
    .isEmail()
    .withMessage("Por favor insira um email válido"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("A senha precisa ser informado para a operação")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
];

export const updateUserRoleValidator = [
  body("role")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("A permissão precisa ser informado para a operação")
    .custom((value) => {
      const roles = ["admin", "user"];
      if (!roles.includes(value)) {
        throw new BaseError("O papel pode ser 'admin' ou 'user'", 400);
      }
      return true;
    }),
];

export const setUserStatusValidator = [
  param("id")
    .notEmpty()
    .withMessage("O id precisa ser informado para a operação")
    .isMongoId()
    .withMessage("O campo 'id' deve ser um ObjectId válido"),
];
