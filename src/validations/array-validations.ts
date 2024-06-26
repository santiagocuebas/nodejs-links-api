import { body, param } from 'express-validator';
import {
	isValidLink,
	isValidTitle,
	isValidURL,
	isValidTitleEdit,
	isValidURLEdit,
	isValidPassword
} from './custom-validators.js';

export const arrayRegister = [
	body('email', 'Invalid email')
		.exists({ values: 'falsy' }).bail()
		.isEmail().normalizeEmail().bail()
		.isLength({ max: 100 }).bail(),
	body('password', 'Invalid password')
		.exists({ values: 'falsy' }).bail()
		.isStrongPassword().withMessage('Password must contains a number, a lower letter, a upper letter and a special character').bail()
		.isLength({ max: 40 }).bail()
		.custom(isValidPassword),
	body('confirmPassword', 'Password not match')
		.custom((value, { req }) => value !== req.body.password)
];

export const arrayLink = [
	body('title', 'Invalid title')
		.exists({ values: 'falsy' }).bail()
		.isString().bail()
		.isLength({ max: 60 })
		.customSanitizer((value: string) => {
			const firstLetter = value.at(0) as string;
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
		.customSanitizer((value: string) => {
			const firstLetter = value.at(0) as string;
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
