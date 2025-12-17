import jwt from "jsonwebtoken";
import BaseError from "../errors/baseError.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1]; // Pega o token não bearer
  if (!token) {
    // res.status(401).json({
    //   sucess: false,
    //   data: null,
    //   error: "Usuário sem autorização",
    // });
    next(new BaseError("Usuário sem autorização", 401));
    return;
  }

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(new BaseError("Token inválido", 403));
      // return res
      //   .status(403)
      //   .json({ success: false, data: null, error: "Token inválido" });
      return;
    }
    req.user = user; // Para passar o usuário decodificado para as próximas rotas
    // req.user.id / req.user.role / req.user.username
    next();
  });
};

export default authMiddleware;
