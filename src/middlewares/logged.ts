import type { Direction } from '../global.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { User } from '../models/index.js';

export const isLoggedIn: Direction = async (req, res, next) => {
	try {
		const token = String(req.headers['Authorization']);
		const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
		const user = await User.findOneBy({ id: decoded.id });

		if (user === null) throw undefined;

		req.user = user;
		return next();
	} catch {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

export const isNotLoggedIn: Direction = async (req, res, next) => {
	try {
		const token = String(req.headers['Authorization']);
		const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
		const user = await User.findOneBy({ id: decoded.id });
		
		if (user === null) throw undefined;

		return res.status(401).json({ message: 'Logged' });
	} catch {
		return next();
	}
};
