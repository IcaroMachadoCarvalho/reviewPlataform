import express from "express";
import { validationMiddleware } from "../middlewares/index.js";
import authController from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";
const router = express.Router();

router
  .post("/login", loginValidator, validationMiddleware, authController.login)
  .post(
    "/register",
    registerValidator,
    validationMiddleware,
    authController.register
  );

export default router;
