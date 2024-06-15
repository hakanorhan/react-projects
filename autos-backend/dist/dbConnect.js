import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        return connection;
    }
    catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error;
    }
}
