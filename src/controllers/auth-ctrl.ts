import type { Direction } from '../global.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { encryptPassword, getId } from '../libs/index.js';
import { User } from '../models/index.js';

export const postRegister: Direction = async (req, res) => {
	try {
		let user = await User.findOneBy({ email: req.body.email });

		if (user === null) {
			user = await User.create({
				id: await getId('User', 16),
				username: req.body.email.split('@')[0],
				email: req.body.email,
				password: await encryptPassword(req.body.password)
			}).save();
		}

		const token = jwt.sign({
			id: user.id,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15
		}, SECRET);

		return res.json({ user, token });
	} catch {
		return res.status(401).json({
			error: 'An error occurred while trying to register the user'
		});
	}
};
