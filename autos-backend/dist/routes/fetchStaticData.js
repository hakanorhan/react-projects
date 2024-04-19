import { pool } from '../dbConnect.js';
const selectQueryBrands = 'SELECT * from brand';
const selectQueryCartypes = 'SELECT * FROM cartype';
const selectQueryTransmissions = 'SELECT * FROM transmission';
const selectQueryFuels = 'SELECT * FROM fuel';
const selectQueryDoors = 'SELECT * FROM door';
const selectQuerySeats = 'SELECT * FROM seat';
const selectQueryBundesland = 'SELECT * FROM federal_state';
const selectQueryPrices = 'SELECT * FROM price';
export default async (req, res) => {
    let connection = await pool.getConnection();
    try {
        const queryResultBrands = await connection.execute(selectQueryBrands);
        const resultBrands = queryResultBrands[0];
        const queryResultCarTypes = await connection.execute(selectQueryCartypes);
        const resultCarTypes = queryResultCarTypes[0];
        const queryResultTransmissions = await connection.execute(selectQueryTransmissions);
        const resultTransmissions = queryResultTransmissions[0];
        const queryResultFuels = await connection.execute(selectQueryFuels);
        const resultFuels = queryResultFuels[0];
        const queryResultDoors = await connection.execute(selectQueryDoors);
        const resultDoors = queryResultDoors[0];
        const queryResultBundesland = await connection.execute(selectQueryBundesland);
        const resultBundesland = queryResultBundesland[0];
        const queryResultPrices = await connection.execute(selectQueryPrices);
        const resultPrices = queryResultPrices[0];
        return res.status(200).json({ message: 'Data send',
            tableValues: { resultBrands, resultCarTypes, resultTransmissions, resultFuels, resultDoors, resultBundesland, resultPrices } });
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
};
