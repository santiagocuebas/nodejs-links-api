import { Router } from 'express';
import { isLoggedIn } from '../middlewares/logged.js';
import { userCTRL } from '../controllers/index.js';
const router = Router();
router.use(isLoggedIn);
router.get('/userData', userCTRL.getUserData);
router.delete('/delete', userCTRL.deleteUser);
export default router;
