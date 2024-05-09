import { connectToDatabase } from "../../dbConnect1.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const insertIntoModels = "insert into model(model, brand_id)VALUES(?, ?)";
const selectModel = "SELECT model_id as id, model FROM model WHERE brand_id = ?";
const selectBrand = "SELECT brand FROM brand WHERE brand_id = ?";
export default async (req, res) => {
    const axiosData = req.body;
    let connection;
    try {
        connection = await connectToDatabase();
        await connection.beginTransaction();
        await connection.execute(insertIntoModels, [axiosData.model, axiosData.brandid]);
        const queryResult = await connection.query(selectModel, [axiosData.brandid]);
        const result = queryResult;
        const resultTableCell = result[0];
        const queryResultBrand = await connection.query(selectBrand, [axiosData.brandid]);
        const resultBrand = queryResultBrand;
        const brandName = resultBrand[0][0].brand;
        await connection.commit();
        connection.end();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt', tableValues: resultTableCell, brand: brandName });
    }
    catch (error) {
        connection?.rollback();
        connection?.end();
        insertMysqlErrorMessages(error.errno, res);
    }
};
