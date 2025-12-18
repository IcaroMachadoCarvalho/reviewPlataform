import { param, body, query } from "express-validator";

export const getCourseByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("O id precisa ser informado para a operação")
    .isMongoId()
    .withMessage("O campo 'id' deve ser um ObjectId válido"),
];

export const getCoursesValidator = [
  query("title")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'title' não pode estar vazio")
    .isString()
    .withMessage("O campo 'title' precisa estar no formato string"),

  query("category")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'category' não pode estar vazio")
    .isString()
    .withMessage("O campo 'category' precisa estar no formato string"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("O campo 'page' deve ser um número inteiro maior que 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("O campo 'limit' deve ser um número entre 1 e 100"),

  query("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("O campo 'rating' deve ser um número entre 1 e 5"),
];

export const createCourseValidator = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'title' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'description' não pode estar vazio")
    .isString()
    .withMessage("A descrição precisa estar no formato string"),
  body("category")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'category' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
  body("imageUrl")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'imageUrl' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
  body("createdBy")
    .trim("")
    .escape()
    .isMongoId()
    .withMessage("O campo 'createdBy' deve ser um ObjectId válido"),
];

export const updateCourseValidator = [
  param("id")
    .notEmpty()
    .withMessage("O id precisa ser informado para a operação")
    .isMongoId()
    .withMessage("O campo 'createdBy' deve ser um ObjectId válido"),
  body("title")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'title' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
  body("description")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'description' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
  body("category")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'category' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
  body("imageUrl")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("O campo 'imageUrl' não pode estar vazio")
    .isString()
    .withMessage("O título precisa estar no formato string"),
];

export const deleteCourseByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("O id precisa ser informado para a operação")
    .isMongoId()
    .withMessage("O campo 'createdBy' deve ser um ObjectId válido"),
];
