import * as mysql from 'mysql2/promise';
import 'dotenv/config';

export function connect() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    return connection;
}