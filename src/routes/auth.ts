import { Router } from 'express';
import { isNotLoggedIn } from '../middlewares/logged.js';
import { authCTRL } from '../controllers/index.js';
import { validate } from '../middlewares/validation.js';
import { arrayRegister } from '../validations/array-validations.js';

const router = Router();

router.post(
  '/register',
  isNotLoggedIn,
  validate(arrayRegister),
  authCTRL.postRegister
);

export default router;
