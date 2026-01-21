export function isAdmin(req, res, next) {
  if (req.user.role !== "admin" || req.user.role === null) {
    return res.status(403).json({
      success: false,
      message: "Acesso negado precisa ter função admin",
      data: null,
    });
  }
  next();
}
