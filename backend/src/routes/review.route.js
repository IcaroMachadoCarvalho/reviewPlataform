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
  ReviewController.deleteReview
);

router.post(
  "/",
  authMiddleware,
  createReviewValidator,
  validationMiddleware,
  ReviewController.createReview
);

export default router;
