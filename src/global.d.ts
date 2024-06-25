import { Request, Response, NextFunction } from 'express';
import { User } from './models/index.js';

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

export type Direction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export interface IKeys<T> {
	[index: string]: T;
}

export interface IGithubData {
	id: number;
	login: string;
	email: string | null;
}

export interface IEmailData {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
}

export interface IGithubUser {
	githubId: number;
	username: string;
	email: string;
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	githubId: number;
	googleId: string;
	createdAt: Date;
}

export interface ILink {
	id: string;
	authorId: string;
	title: string;
	url: string;
	description: string;
	createdAt: Date;
}
