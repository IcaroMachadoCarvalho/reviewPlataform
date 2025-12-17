import { param, body, query } from "express-validator";

export const createReviewValidator = [
  body("courseId")
    .notEmpty()
    .withMessage("O id do curso precisa ser informado para a operação")
    .isMongoId()
    .withMessage("O campo 'courseId' deve ser um ObjectId válido"),

  body("rating")
    .notEmpty()
    .withMessage("O campo 'rating' é obrigatório")
    .isInt({ min: 1, max: 5 })
    .withMessage("O campo 'rating' deve ser um número inteiro entre 1 e 5"),

  body("comment")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O comentário não pode estar vazio se enviado"),
];

export const listReviewsBySectionValidator = [
  param("id")
    .notEmpty()
    .withMessage("O id precisa ser informado para a operação")
    .isMongoId()
    .withMessage("O campo 'id' deve ser um ObjectId válido"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("O campo 'page' deve ser um número inteiro maior que 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("O campo 'limit' deve ser um número entre 1 e 100"),
];
