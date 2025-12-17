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
}
