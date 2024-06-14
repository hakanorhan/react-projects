import { connectToDatabase } from '../dbConnect.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
const selectQueryBrands = 'SELECT * FROM brand WHERE brand_id IN (SELECT brand_id FROM model)';
const selectQueryCartypes = 'SELECT * FROM cartype';
const selectQueryTransmissions = 'SELECT * FROM transmission';
const selectQueryFuels = 'SELECT * FROM fuel';
const selectQueryDoors = 'SELECT * FROM door';
const selectQueryBundesland = 'SELECT * FROM federal_state';
const selectQueryPrices = 'SELECT * FROM price';
export default async (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    console.log("fetchStaticData");
    let connection;
    try {
        connection = await connectToDatabase();
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
        connection.end();
        return res.status(200).json({ message: 'Data send',
            tableValues: { resultBrands, resultCarTypes, resultTransmissions, resultFuels, resultDoors, resultBundesland, resultPrices, isAuthenticated } });
    }
    catch (error) {
        console.log(error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
};
