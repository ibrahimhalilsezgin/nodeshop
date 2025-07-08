import jwt from "jsonwebtoken";
import "dotenv/config";
export const authenticateToken = (req, res, next) => {
    const header = req.headers.authorization;
    // console.log(header)
    if(!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token Geçersiz'});
    }


    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.SecretKey);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403);
    }
};

export const isAdmin = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token Geçersiz'});
    }

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.SecretKey);

        if(!decoded.isAdmin) {
            return res.status(403);
        } else {
            req.user = decoded;
            next();
        }
    } catch (err) {
        return res.status(403);
    }
}