export default class BaseError extends Error {
  constructor(
    message = "Erro interno do servidor",
    status = 500,
    success = false,
    data = null
  ) {
    super();
    this.message = message;
    this.status = status;
    this.success = success;
    this.data = data;
  }

  sendResponse(res) {
    res.status(this.status).send({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}
