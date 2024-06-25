import { Router } from 'express';
import { isNotLoggedIn } from '../middlewares/logged.js';
import { authCTRL } from '../controllers/index.js';
const router = Router();
router.use(isNotLoggedIn);
router.post('/googleRegister', authCTRL.postGoogle);
router.post('/githubRegister', authCTRL.postGithub);
export default router;
