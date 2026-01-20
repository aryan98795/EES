import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
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
            message: error.message
        });
    }
};

export const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
};


