import authMiddleware from "./authMiddleware.js";
import validationMiddleware from "./validationMiddleware.js";
import errorMiddleware from "./errorHandler.js";
import notFoundMiddleware from "./notFoundHandler.js";
import { isAdmin } from "./adminMiddleware.js";
export {
  authMiddleware,
  validationMiddleware,
  errorMiddleware,
  notFoundMiddleware,
  isAdmin,
};
