import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { User } from '../models/index.js';
export const isLoggedIn = async (req, res, next) => {
    try {
        const token = String(req.headers.authorization);
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOneBy({ id: decoded.id });
        if (user === null)
            throw undefined;
        req.user = user;
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
export const isNotLoggedIn = async (req, res, next) => {
    try {
        const token = String(req.headers.authorization);
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOneBy({ id: decoded.id });
        if (user === null)
            throw undefined;
        return res.status(401).json({ message: 'Logged' });
    }
    catch {
        return next();
    }
};
