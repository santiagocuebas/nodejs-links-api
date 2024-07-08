import type { Direction } from '../global.js';
import { Link, User } from '../models/index.js';

export const getLinks: Direction = async (req, res) => {
	const links = await Link
		.find({
			where: { authorId: req.user.id },
			order: { createdAt: 'DESC' }
		})
		.catch(() => []);
		
	return res.json(links);
};

export const deleteUser: Direction = async (req, res) => {
	try {
		await Link.delete({ authorId: req.user.id });
		await User.delete({ id: req.user.id });
	
		return res.json({ delete: true });
	} catch {
		return res.status(401).json({ delete: false })
	}
}
