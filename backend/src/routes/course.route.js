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
    CourseController.getCourseById
  )
  .get(
    "/:id/reviews",
    authMiddleware,
    listReviewsBySectionValidator,
    validationMiddleware,
    CourseController.getReviewsByCourse
  )
  .get(
    "/",
    authMiddleware,
    getCoursesValidator,
    validationMiddleware,
    CourseController.getCourses
  )
  .post(
    "/",
    authMiddleware,
    createCourseValidator,
    validationMiddleware,
    CourseController.createCourse
  )
  .patch(
    "/:id",
    authMiddleware,
    updateCourseValidator,
    validationMiddleware,
    CourseController.updateCourse
  )
  .delete(
    "/:id",
    authMiddleware,
    deleteCourseByIdValidator,
    validationMiddleware,
    CourseController.deleteCourse
  );

export default router;
