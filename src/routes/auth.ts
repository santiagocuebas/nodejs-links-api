import { Router } from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/logged.js';
import { authCTRL } from '../controllers/index.js';

const router = Router();

router.get('/userData', isLoggedIn, authCTRL.getUserData);

router.post('/googleRegister', isNotLoggedIn, authCTRL.postGoogle);

router.post('/githubRegister', isNotLoggedIn, authCTRL.postGithub);

export default router;
