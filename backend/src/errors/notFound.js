import BaseError from "./baseError.js";

export default class NotFound extends BaseError {
  constructor(message = "Página não encontrada") {
    super(message, 404);
  }
}
