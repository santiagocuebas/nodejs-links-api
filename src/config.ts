import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const SECRET = process.env.SECRET as string;

export const DB_URL = process.env.DB_URL;

export const GITHUB_URL = process.env.GITHUB_URL;

export const ORIGIN = process.env.ORIGIN;

export const DOMAIN = process.env.DOMAIN;

export const NODE_ENV = process.env.NODE_ENV;
