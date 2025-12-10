import express from "express";
import cors from "cors";
import authRoutes from "./auth.route.js";
import courseRoutes from "./course.route.js";
const routes = (app) => {
  app.use(express.json());
  app.use(cors());
  app.route("/").get((req, res) => {
    res
      .status(200)
      .send({ sucess: true, data: "Aplicação de Ícaro Machado de Carvalho" });
  });
  app.use("/api/users", authRoutes);
  app.use("/api/courses", courseRoutes);
};

export default routes;
