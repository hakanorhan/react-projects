import { pool } from "../dbConnect.js";
export default async function performFetch(res, selectQuery) {
    let connection = await pool.getConnection();
    try {
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0];
        const resultForSelect = result;
        console.log('++++++++++++++++');
        console.log(resultForSelect);
        console.log('++++++++++++++++');
        return res.status(200).json({ message: 'Data send', tableValues: resultForSelect });
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Daten' });
    }
    finally {
        connection.release();
    }
}
;
