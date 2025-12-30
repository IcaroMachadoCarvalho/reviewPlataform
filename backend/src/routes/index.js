import express from "express";
import cors from "cors";
import authRoutes from "./auth.route.js";
import courseRoutes from "./course.route.js";
import reviewRoutes from "./review.route.js";
import userRoutes from "./user.route.js";
import { notFoundMiddleware, errorMiddleware } from "../middlewares/index.js";

const routes = (app) => {
  app.use(express.json());
  app.use(cors());
  app.route("/").get((req, res) => {
    res.status(200).json({
      sucess: true,
      message: "Rota inicial da aplicação",
      data: null,
    });
  });
  app.use("/api/auth", authRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/users", userRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};

export default routes;
