import { Router } from 'express';
import { isLoggedIn } from '../middlewares/logged.js';
import { Link, User } from '../models/index.js';

const router = Router();

router.use(isLoggedIn);

router.get('/links', async (req, res) => {
	// Get all user links
	const links = await Link
		.find({
			where: { authorId: req.user.id },
			order: { createdAt: 'DESC' }
		})
		.catch(() => []);

	return res.json({ links });
});

router.delete('/delete', async (req, res) => {
	try {
		// Delete user an your links
		await Link.delete({ authorId: req.user.id });
		await User.delete({ id: req.user.id });
	
		return res.json(true);
	} catch {
		return res.status(401).json(false)
	}
});

export default router;
