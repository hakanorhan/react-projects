import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    try {
      // Create a MySQL connection
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cars'
      });
  
      // Return the connection
      return connection;
    } catch (error) {
      console.error('Error connecting to MySQL database:', error);
      throw error; // Propagate the error to the caller
    }
  }