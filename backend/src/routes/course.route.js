import express from "express";
import CourseController from "../controllers/course.controller.js";
import { param, body, query } from "express-validator";
import { authMiddleware, validationMiddleware } from "../middlewares/index.js";
const router = express.Router();

// Auth Middleware é bom antes da verificação
router
  .get(
    "/:id",
    authMiddleware,
    [
      param("id")
        .notEmpty()
        .withMessage("O id precisa ser informado para a operação")
        .isMongoId()
        .withMessage("O campo 'id' deve ser um ObjectId válido"),
    ],
    validationMiddleware,
    CourseController.getCourseById
  )

  .get(
    "/",
    authMiddleware,
    [
      query("title")
        .trim()
        .escape()
        .isString()
        .withMessage("O título precisa estar no formato string"),
      query("category")
        .trim()
        .escape()
        .isString()
        .withMessage("O título precisa estar no formato string"),
    ],
    validationMiddleware,
    CourseController.getCourses
  )
  .post(
    "/",
    authMiddleware,
    [
      body("title")
        .trim()
        .escape()
        .isString()
        .withMessage("O título precisa estar no formato string"),
      body("description")
        .trim()
        .escape()
        .isString()
        .withMessage("O título precisa estar no formato string"),
      body("category")
        .trim()
        .escape()
        .isString()
        .withMessage("O título precisa estar no formato string"),
      body("imageUrl")
        .trim()
        .escape()
        .isString()
        .withMessage("O título precisa estar no formato string"),
      body("createdBy")
        .trim("")
        .escape()
        .isMongoId()
        .withMessage("O campo 'createdBy' deve ser um ObjectId válido"),
    ],
    validationMiddleware,
    CourseController.createCourse
  )
  .patch(
    "/:id",
    authMiddleware,
    param("id")
      .notEmpty()
      .withMessage("O id precisa ser informado para a operação")
      .isMongoId()
      .withMessage("O campo 'createdBy' deve ser um ObjectId válido"),
    body("title")
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage("O título precisa estar no formato string"),
    body("description")
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage("O título precisa estar no formato string"),
    body("category")
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage("O título precisa estar no formato string"),
    body("imageUrl")
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage("O título precisa estar no formato string"),
    validationMiddleware,
    CourseController.updateCourse
  )
  .delete(
    "/:id",
    authMiddleware,
    [
      param("id")
        .notEmpty()
        .withMessage("O id precisa ser informado para a operação")
        .isMongoId()
        .withMessage("O campo 'createdBy' deve ser um ObjectId válido"),
    ],
    validationMiddleware,
    CourseController.deleteCourse
  );

export default router;
