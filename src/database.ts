import { DataSource } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } from './config.js';
import { Link, User } from './models/index.js';

export const dbConn = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USER,
	password: DB_PASS,
	database: DB_DATABASE,
	synchronize: false,
	logging: true,
	entities: [Link, User]
});
