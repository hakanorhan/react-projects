import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Database connection.
 */
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cars',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
//# sourceMappingURL=dbConnect.js.map