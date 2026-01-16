import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.send.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: error.name,
            message: error.message
        });
    }
};

export const requiredRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
}