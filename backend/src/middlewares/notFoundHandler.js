import NotFound from "../errors/notFound.js";

const notFoundMiddleware = (req, res, next) => {
  next(new NotFound());
};

export default notFoundMiddleware;
