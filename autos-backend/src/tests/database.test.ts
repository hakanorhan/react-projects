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

export async function executeQueryTest(query: string) {
    try {
        // Verbindung aus dem Pool abrufen
        const connection = await pool.getConnection();

        // SQL-Abfrage ausführen
        const [rows] = await connection.execute(query);

        // Verbindung freigeben
        connection.release();

        return rows;
    } catch (error) {
        console.error('Fehler beim Ausführen der SQL-Abfrage:', error);
        throw error;
    }
}

export async function setupData(query: string, values: any[]) {
    const connection = await pool.getConnection();
    try {
        connection.execute(query, values);
    } catch(err) {
        console.error(err);
    } finally {
        connection.release();
    }
}

describe('Database Tests', () => {
    test('Test executeQuery function', async () => {
        // Mocking executeQuery function
        const mockExecuteQuery = jest.fn().mockResolvedValue([{ brandid: 45, brand: 'Skoda' }]);

        // Call the mocked function
        const result = await mockExecuteQuery('SELECT * FROM brands');

        // Assertions
        //expect(mockExecuteQuery).toHaveBeenCalledTimes(1);
        expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM brands');
        expect(result).toEqual([{ brandid: 45, brand: 'Skoda' }]);
    });
});

describe('SELECT', () => {
    test('Select brand Yasemin', async() => {
        //await setupData();
    })
})