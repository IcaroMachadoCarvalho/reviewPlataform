import { UserService } from "../services/index.js";

class authController {
  // Foca na interação com a requisição e resposta, e delega a lógica de negócios para o service.
  // Service: Foca na lógica de negócios, como a verificação de dados e manipulação de dados no banco (verificar e-mails, criar usuários, etc.).

  static async login(req, res, next) {
    try {
      const { userData, token } = await UserService.login(req.body);

      res.status(200).json({
        success: true,
        message: "Usuário logado com sucesso!",
        data: userData,
        token: token,
      });
    } catch (error) {
      // console.log("Erro no controlador login:", error.message);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      await UserService.register(req.body);

      res.status(201).json({
        success: true,
        message: "Cadastro de conta concluído",
        data: null,
      });
    } catch (error) {
      // console.log("Erro no controlador register:", error.message);
      next(error);
    }
  }
}

export default authController;
