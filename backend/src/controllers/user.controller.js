import { UserService } from "../services/index.js";
import BaseError from "../errors/baseError.js";
import bcrypt from "bcrypt";

export default class UserController {
  static async updateUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const isUsernameOrEmailAlreadyInUse =
        await UserService.verifyIfUsernameOrEmailAlreadyInUse(username, email);

      if (isUsernameOrEmailAlreadyInUse) {
        next(new BaseError("Credenciais já em uso", 400));
        return;
      }

      const updatedUserData = req.body;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updatedUserData.password = hashedPassword;
      }

      const updatedUser = await UserService.updateUser(
        req.user.id,
        updatedUserData
      );
      res.status(200).json({
        sucess: true,
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
    } catch (error) {
      console.log("Erro no controlador User update:", error.message);
      next(error);
    }
  }

  static async setUserRole(req, res, next) {
    try {
      const { userId, role } = req.body;

      await UserService.updateRole(userId, role);

      res.status(200).json({
        sucess: true,
        message: "Usuário atualizado com sucesso!",
        data: null,
      });
    } catch (error) {
      console.log("Erro no controlador User setUserRole :", error.message);
      next(error);
    }
  }

  static async blockUser(req, res, next) {
    try {
      const { id } = req.params.id;

      await UserService.blockUser(id);

      res.status(204).json({
        sucess: true,
        message: "Usuário bloqueado com sucesso!",
        data: null,
      });
    } catch (error) {
      console.log("Erro no controlador User block user :", error.message);
      next(error);
    }
  }
  static async unblockUser(req, res, next) {
    try {
      const { id } = req.params.id;

      await UserService.unblockUser(id);

      res.status(204).json({
        sucess: true,
        message: "Usuário desbloqueado com sucesso!",
        data: null,
      });
    } catch (error) {
      console.log("Erro no controlador User block user :", error.message);
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const usersList = await UserService.getUsers();

      res.status(200).json({
        sucess: true,
        message: "Lista de usuários obtidos com sucesso!",
        data: usersList,
      });
    } catch (error) {
      console.log("Erro no controlador User block user :", error.message);
      next(error);
    }
  }
}
