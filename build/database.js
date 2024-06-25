import { DataSource } from 'typeorm';
import { DB_URI } from './config.js';
import { Link, User } from './models/index.js';
export const dbConn = new DataSource({
    type: 'cockroachdb',
    url: DB_URI,
    synchronize: false,
    ssl: true,
    logging: true,
    timeTravelQueries: false,
    entities: [Link, User]
});
