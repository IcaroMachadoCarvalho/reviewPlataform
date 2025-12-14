import NotFound from "../errors/notFound.js";

const notFoundHandler = (req, res, next) => {
  next(new NotFound());
};

export default notFoundHandler;
