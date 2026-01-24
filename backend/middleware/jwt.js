import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const a = req.headers.authorization;
  if (!a) return res.sendStatus(401);

  const token = a.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: error.name,
      message: error.message,
    });
  }
};

export const requireRole = (roles) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

