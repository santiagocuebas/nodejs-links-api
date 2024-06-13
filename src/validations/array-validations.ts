import { body, param } from 'express-validator';
import {
	isValidLink,
	isValidTitle,
	isValidURL,
	isValidTitleEdit,
	isValidURLEdit
} from './custom-validators.js';

export const arrayLink = [
	body('title', 'Invalid title')
		.exists({ checkFalsy: true }).bail()
		.isString().bail()
		.isLength({ min: 5, max: 60 })
		.customSanitizer((value: string) => {
			const firstLetter = value.at(0) as string;
			return value.replace(firstLetter, firstLetter.toUpperCase());
		})
		.custom(isValidTitle),
	body('url', 'Invalid url')
		.exists({ checkFalsy: true }).bail()
		.isURL().bail()
		.isLength({ max: 255 })
		.custom(isValidURL),
	body('description', 'Invalid description')
		.isString().bail()
		.isLength({ max: 255 })
];

export const arrayEditLink = [
	param('id')
		.exists({ checkFalsy: true }).bail()
		.custom(isValidLink),
	body('title', 'Invalid title')
		.exists({ checkFalsy: true }).bail()
		.isString().bail()
		.isLength({ min: 5, max: 60 })
		.customSanitizer((value: string) => {
			const firstLetter = value.at(0) as string;
			return value.replace(firstLetter, firstLetter.toUpperCase());
		})
		.custom(isValidTitleEdit),
	body('url', 'Invalid url')
		.exists({ checkFalsy: true }).bail()
		.isURL().bail()
		.isLength({ max: 255 })
		.custom(isValidURLEdit),
	body('description', 'Invalid description')
		.isString().bail()
		.isLength({ max: 255 })
];
