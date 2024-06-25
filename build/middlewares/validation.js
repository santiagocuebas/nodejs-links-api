import { validationResult } from 'express-validator';
import { getErrorMessages } from '../libs/index.js';
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errs = validationResult(req);
        if (errs.isEmpty())
            return next();
        const errors = getErrorMessages(errs.array());
        return res.json({ errors });
    };
};
