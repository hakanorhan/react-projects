import { pool } from "../../dbConnect.js";
import { REGEX_NAMES } from "../../regex/regex.js";
export default async function performInsert(requestData, res, insertQuery, selectQuery) {
    const insertValue = requestData;
    if (!REGEX_NAMES.test(insertValue)) {
        return res.status(401).json({ message: 'Bitte Marke korrigieren' });
    }
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.execute(insertQuery, [insertValue]);
        const queryResult = await connection.query(selectQuery);
        const result = queryResult;
        const resultTableCell = result[0];
        console.log(resultTableCell);
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell });
    }
    catch {
        connection.rollback();
        return res.status(500).json({ message: `${insertValue} existiert bereits` });
    }
    finally {
        connection.release();
    }
}
;
