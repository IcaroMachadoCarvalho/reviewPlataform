import { ReviewService } from "../services/index.js";

export default class ReviewController {
  static async createReview(req, res, next) {
    try {
      const data = await ReviewService.create({
        userId: req.user.id,
        ...req.body,
      });
      res.status(201).json({
        success: true,
        message: "Review criada com sucesso",
        data: data,
      });
    } catch (error) {
      console.log("Erro no controlador review create:", error.message);
      next(error);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const { id } = req.params;
      await ReviewService.deleteReview(id);
      res.status(204).json({
        success: true,
        message: "Review apagada com sucesso",
        data: null,
      });
    } catch (error) {
      console.log("Erro no controlador review delete:", error.message);
      next(error);
    }
  }
}
