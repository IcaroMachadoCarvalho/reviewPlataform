import express from "express";
import CourseController from "../controllers/course.controller.js";
import { authMiddleware, validationMiddleware } from "../middlewares/index.js";
import {
  getCourseByIdValidator,
  getCoursesValidator,
  createCourseValidator,
  updateCourseValidator,
  deleteCourseByIdValidator,
} from "../validators/course.validators.js";
import { listReviewsBySectionValidator } from "../validators/review.validators.js";
const router = express.Router();

// Auth Middleware é bom antes da verificação
router
  .get("/ranking", authMiddleware, CourseController.getCoursesRanking) // + específicas em cima
  .get(
    "/:id",
    authMiddleware,
    getCourseByIdValidator,
    validationMiddleware,
    CourseController.getCourseById,
  )
  .get(
    "/:id/reviews",
    authMiddleware,
    listReviewsBySectionValidator,
    validationMiddleware,
    CourseController.getReviewsByCourse,
  )
  .get(
    "/",
    authMiddleware,
    getCoursesValidator,
    validationMiddleware,
    CourseController.getCourses,
  )
  .post(
    "/",
    authMiddleware,
    createCourseValidator,
    validationMiddleware,
    CourseController.createCourse,
  )
  .patch(
    "/:id",
    authMiddleware,
    updateCourseValidator,
    validationMiddleware,
    CourseController.updateCourse,
  )
  .delete(
    "/:id",
    authMiddleware,
    deleteCourseByIdValidator,
    validationMiddleware,
    CourseController.deleteCourse,
  );

export default router;

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Criar um curso
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourseRequest'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos estão incorretos
 *       401:
 *         description: Usuário sem autorização ou token inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   patch:
 *     summary: Atualizar um curso
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCourseRequest'
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou token inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Lista cursos com filtros
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: Filtra cursos pelo título
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: category
 *         required: false
 *         description: Filtra cursos pela categoria
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página (paginação)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Quantidade de itens por página (1 a 100)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *
 *       - in: query
 *         name: rating
 *         required: false
 *         description: Avaliação mínima do curso (1 a 5)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Obter um curso
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Curso obtido com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou token inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/courses/ranking:
 *   get:
 *     summary: Obter o ranking de cursos
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Ranking de cursos obtido com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou token inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/courses/{id}/reviews:
 *   get:
 *     summary: Obter as reviews de um curso
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página (paginação)
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Quantidade de cursos no ranking
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Reviews obtidas com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos estão incorretos
 *       401:
 *         description: Usuário sem autorização ou token inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Deletar um curso
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso deletado com sucesso
 *       400:
 *         description: Um ou mais dados fornecidos estão incorretos
 *       401:
 *         description: Usuário sem autorização ou token inválido
 *       500:
 *         description: Erro interno do servidor
 */
