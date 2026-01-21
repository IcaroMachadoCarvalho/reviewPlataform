import express from "express";
import ReviewController from "../controllers/review.controller.js";
import {
  authMiddleware,
  isAdmin,
  validationMiddleware,
} from "../middlewares/index.js";
import {
  createReviewValidator,
  deleteReviewValidator,
} from "../validators/review.validators.js";

const router = express.Router();

router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  deleteReviewValidator,
  validationMiddleware,
  ReviewController.deleteReview,
);

router.post(
  "/",
  authMiddleware,
  createReviewValidator,
  validationMiddleware,
  ReviewController.createReview,
);

export default router;

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Cria uma nova review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewRequest'
 *     responses:
 *       201:
 *         description: Review criada com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Deleta uma review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da review
 *     responses:
 *       200:
 *         description: Review deletada com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
