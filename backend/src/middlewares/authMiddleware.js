import jwt from "jsonwebtoken";
// import BaseError from "../errors/baseError.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Verifique se o cabeçalho existe

  // Se o cabeçalho "Authorization" não existe ou não tem um token no formato Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: "false",
      message: "Usuário sem autorização",
      data: null,
    });
  }

  const token = authHeader.split(" ")[1]; // Pega o token depois de "Bearer"

  if (!token) {
    return res.status(401).json({
      success: "false",
      message: "Usuário sem autorização",
      data: null,
    });
  }

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: "false",
        message: "Token inválido",
        data: null,
      });
    }

    req.user = user; // Passa o usuário decodificado para as próximas rotas
    next();
  });
};

export default authMiddleware;
