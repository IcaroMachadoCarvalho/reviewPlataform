import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1]; // Pega o token não bearer
  if (!token) {
    res.status(401).json({
      sucess: false,
      data: null,
      error: "Usuário sem autorização",
    });
  }

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, data: null, error: "Token inválido" });
    }
    req.user = user; // Para passar o usuário decodificado para as próximas rotas
    next();
  });
};

export default authMiddleware;
