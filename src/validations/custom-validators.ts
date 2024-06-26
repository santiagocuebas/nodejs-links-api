import type { CustomValidator } from 'express-validator';
import { matchPassword } from '../libs/index.js';
import { Link, User } from '../models/index.js';

export const isValidPassword: CustomValidator = async (value: string, { req }) => {
	const user = await User.findOneBy({ email: req.body.email });

	if (user !== null) {
		const match = await matchPassword(value, user.password);

		if (!match) throw new Error('Password not match');
	}

	return true;
};

export const isValidTitle: CustomValidator = async (title: string, { req }) => {
	const link = await Link.findOneBy({ title, authorId: req.user.id });

	if (link !== null) throw new Error('The title exists');

	return true;
};

export const isValidURL: CustomValidator = async (url: string, { req }) => {
	const link = await Link.findOneBy({ url, authorId: req.user.id });

	if (link !== null) throw new Error('The url exist');

	return true;
};

export const isValidLink: CustomValidator = async (id: string) => {
	const link = await Link.findOneBy({ id });

	if (link === null) throw new Error('The link not exist');

	return true;
};

export const isValidTitleEdit: CustomValidator = async (title: string, { req }) => {
	const link = await Link.findOneBy({ title, authorId: req.user.id });

	if (link !== null && link.id !== req.params?.id) {
		throw new Error('The title exists');
	}

	return true;
};

export const isValidURLEdit: CustomValidator = async (url: string, { req }) => {
	const link = await Link.findOneBy({ url, authorId: req.user.id });

	if (link !== null && link.id !== req.params?.id) {
		throw new Error('The url exist');
	}

	return true;
};
