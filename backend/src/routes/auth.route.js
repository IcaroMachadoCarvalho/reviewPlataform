import express from "express";
import { body } from "express-validator";
import { validationMiddleware } from "../middlewares/index.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

// Falta name

router
  .post(
    "/login",
    [
      body("username")
        .escape()
        .trim()
        .isLength({ min: 3 })
        .withMessage("O nome de usuário deve ter pelo menos 3 caracteres"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("A senha deve ter pelo menos 6 caracteres"),
    ],
    validationMiddleware,
    authController.login
  )
  .post(
    "/register",
    [
      body("username")
        .trim()
        .escape()
        .isLength({ min: 6 })
        .withMessage("O nome de usuário deve conter pelo menos 6 caracteres"),
      body("email").isEmail().withMessage("Por favor insira um email válido"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("A senha deve ter pelo menos 6 caracteres"),
      body("role")
        .trim()
        .escape()
        .custom((value) => {
          // Valida se o valor de 'role' é 'admin' ou 'user'
          const roles = ["admin", "user"];
          if (!roles.includes(value)) {
            throw new Error("O papel pode ser 'admin' ou 'user'");
          }
          return true;
        }),
    ],
    validationMiddleware,
    authController.register
  );

export default router;
