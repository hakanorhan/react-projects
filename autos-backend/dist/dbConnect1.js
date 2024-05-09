import mysql from 'mysql2/promise';
export async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'cars'
        });
        return connection;
    }
    catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error;
    }
}
