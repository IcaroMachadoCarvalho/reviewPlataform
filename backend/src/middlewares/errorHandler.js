import BaseError from "../errors/baseError.js";
import NotFound from "../errors/notFound.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFound) {
    err.sendResponse(res);
  } else if (err instanceof BaseError) {
    err.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};

export default errorHandler;
