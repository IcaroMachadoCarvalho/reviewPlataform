import bcrypt from "bcrypt";
import generateTokenService from "../utils/generateToken.js";
import { UserService } from "../services/index.js";
import BaseError from "../errors/baseError.js";

class authController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserService.getUserByUsername(username);

      if (!user) {
        next(new BaseError("Credenciais inválidas", 400));
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        next(new BaseError("Credenciais inválidas", 400));
        return;
      }

      // Geração do token
      const userObj = user.toObject();
      delete userObj.password; // Remove o campo password pois em cima tinha que verificar que é valido
      const token = generateTokenService(user._id, username, user.role);

      res.status(200).json({
        success: true,
        data: userObj,
        token: token,
      });
    } catch (error) {
      console.log("Erro no controlador login:", error.message);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const isUsernameOrEmailAlreadyInUse =
        await UserService.verifyIfUsernameOrEmailAlreadyInUse(username, email);

      if (isUsernameOrEmailAlreadyInUse) {
        next(new BaseError("Credenciais inválidas", 400));
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await UserService.createUser({
        username,
        email,
        hashedPassword,
      });

      res
        .status(201)
        .json({ sucess: true, message: "Cadastro de conta concluído" });
    } catch (error) {
      console.log("Erro no controlador register:", error.message);
      next(error);
    }
  }
}

export default authController;
