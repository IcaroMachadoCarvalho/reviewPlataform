export function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({
        success: false,
        message: "Acesso negado precisa ter função admin",
        data: null,
      });
  }
  next();
}
