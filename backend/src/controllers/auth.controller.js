import bcrypt from "bcrypt";
import generateTokenService from "../utils/generateToken.js";
import { UserService } from "../services/index.js";

class authController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserService.getUserByUsername(username);

      if (!user) {
        return res.status(400).json({
          success: false,
          data: null,
          errors: "Credenciais inválidas",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ success: false, errors: "Credenciais inválidas" });
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
      res
        .status(500)
        .json({ success: false, data: null, errors: "Internal Server Error" });
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const isUsernameOrEmailAlreadyInUse =
        await UserService.verifyIfUsernameOrEmailAlreadyInUse(username, email);

      if (isUsernameOrEmailAlreadyInUse) {
        return res.status(400).json({
          sucess: false,
          data: null,
          errors: "Credenciais inválidas",
        });
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
      res
        .status(500)
        .json({ sucess: false, data: null, errors: "Internal Server Error" });
    }
  }
}

export default authController;
