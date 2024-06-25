import { Router } from 'express';
import { linkCTRL } from '../controllers/index.js';
import { isLoggedIn } from '../middlewares/logged.js';
import { validate } from '../middlewares/validation.js';
import { arrayLink, arrayEditLink } from '../validations/array-validations.js';

const router = Router();

router.use(isLoggedIn);

router.post('/add', validate(arrayLink), linkCTRL.postLink);

router.put('/edit/:id', validate(arrayEditLink), linkCTRL.postEdit);

router.delete('/delete/:id', linkCTRL.deleteLink);

export default router;
