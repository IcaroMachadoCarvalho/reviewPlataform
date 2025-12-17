import express from "express";
import ReviewController from "../controllers/review.controller.js";
import { authMiddleware, validationMiddleware } from "../middlewares/index.js";
import { createReviewValidator } from "../validators/review.validators.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createReviewValidator,
  validationMiddleware,
  ReviewController.createReview
);

export default router;
