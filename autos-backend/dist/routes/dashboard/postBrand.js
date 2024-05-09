import { connectToDatabase } from "../../dbConnect1.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const insertIntoBrand = "INSERT INTO brand (brand) VALUES (?)";
const selectBrandQuery = "SELECT * FROM brand";
export default async (req, res) => {
    const { value } = req.body;
    let connection;
    try {
        connection = await connectToDatabase();
        await connection.beginTransaction();
        const [resultBrand] = await connection.execute(insertIntoBrand, [value]);
        const insertId = resultBrand.insertId;
        const queryResult = await connection.query(selectBrandQuery);
        const result = queryResult;
        const resultTableCell = result[0];
        await connection.commit();
        console.log(resultTableCell);
        connection.end();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, insertId: insertId });
    }
    catch (error) {
        connection?.rollback();
        connection?.end();
        insertMysqlErrorMessages(error.errno, res);
    }
};
