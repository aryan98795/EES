export const requireRole = (allowedRoles = []) => {
  const response = (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
  return response;
};
