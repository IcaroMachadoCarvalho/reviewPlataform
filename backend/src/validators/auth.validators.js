import { body } from "express-validator";

export const loginValidator = [
  body("username")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("O username precisa ser informado para a operação")
    .isLength({ min: 3 })
    .withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
  body("password")
    .notEmpty()
    .withMessage("A senha precisa ser informado para a operação")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
];

export const registerValidator = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O username precisa ser informado para a operação")
    .isLength({ min: 6 })
    .withMessage("O nome de usuário deve conter pelo menos 6 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("O email precisa ser informado para a operação")
    .isEmail()
    .withMessage("Por favor insira um email válido"),
  body("password")
    .notEmpty()
    .withMessage("A senha precisa ser informado para a operação")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
  // body("role")
  //   .trim()
  //   .escape()
  //   .custom((value) => {
  //     // Valida se o valor de 'role' é 'admin' ou 'user'
  //     const roles = ["admin", "user"];
  //     if (!roles.includes(value)) {
  //       throw new Error("O papel pode ser 'admin' ou 'user'");
  //     }
  //     return true;
  //   }),
];
