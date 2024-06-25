import { body, param } from 'express-validator';
import { isValidLink, isValidTitle, isValidURL, isValidTitleEdit, isValidURLEdit } from './custom-validators.js';
export const arrayLink = [
    body('title', 'Invalid title')
        .exists({ values: 'falsy' }).bail()
        .isString().bail()
        .isLength({ max: 60 })
        .customSanitizer((value) => {
        const firstLetter = value.at(0);
        return value.replace(firstLetter, firstLetter.toUpperCase());
    })
        .custom(isValidTitle),
    body('url', 'Invalid url')
        .exists({ values: 'falsy' }).bail()
        .isURL().bail()
        .isLength({ max: 255 })
        .custom(isValidURL),
    body('description', 'Invalid description')
        .isString().bail()
        .isLength({ max: 255 })
];
export const arrayEditLink = [
    param('id')
        .exists({ values: 'falsy' }).bail()
        .custom(isValidLink),
    body('title', 'Invalid title')
        .exists({ values: 'falsy' }).bail()
        .isString().bail()
        .isLength({ min: 5, max: 60 })
        .customSanitizer((value) => {
        const firstLetter = value.at(0);
        return value.replace(firstLetter, firstLetter.toUpperCase());
    })
        .custom(isValidTitleEdit),
    body('url', 'Invalid url')
        .exists({ values: 'falsy' }).bail()
        .isURL().bail()
        .isLength({ max: 255 })
        .custom(isValidURLEdit),
    body('description', 'Invalid description')
        .isString().bail()
        .isLength({ max: 255 })
];
