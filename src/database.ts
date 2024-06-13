import { DataSource } from 'typeorm';
import { DB_URL } from './config.js';
import { Link, User } from './models/index.js';

export const dbConn = new DataSource({
	type: 'cockroachdb',
	url: DB_URL,
	synchronize: false,
	logging: true,
	timeTravelQueries: true,
	entities: [Link, User]
});
