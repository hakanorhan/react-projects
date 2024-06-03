import { connectToDatabase } from "../../dbConnect1.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
import { formularIsNumber, formularModelIsValid } from "../../helper/validHelper.js";
const insertIntoModels = "insert into model(model, brand_id)VALUES(?, ?)";
const selectModel = "SELECT model_id, model FROM model WHERE brand_id = ?";
const selectBrand = "SELECT brand FROM brand WHERE brand_id = ?";
export default async (req, res) => {
    const axiosData = req.body;
    if (!formularIsNumber(axiosData.brandid) || !formularModelIsValid(axiosData.model)) {
        insertMysqlErrorMessages(1, res);
    }
    else {
        let connection;
        try {
            connection = await connectToDatabase();
            await connection.beginTransaction();
            await connection.execute(insertIntoModels, [axiosData.model, axiosData.brandid]);
            const queryResult = await connection.query(selectModel, [axiosData.brandid]);
            const result = queryResult[0];
            const queryResultBrand = await connection.query(selectBrand, [axiosData.brandid]);
            const resultModel = queryResultBrand;
            const brand = resultModel[0][0].brand;
            const models = result.map((row) => {
                const object = {
                    modelId: row.model_id,
                    model: row.model
                };
                return object;
            });
            console.log(models);
            await connection.commit();
            connection.end();
            const axiosDataPacket = { message: "Erfolgreich hinzugefügt", dataModels: models, brand };
            return res.status(200).json(axiosDataPacket);
        }
        catch (error) {
            connection?.rollback();
            connection?.end();
            insertMysqlErrorMessages(error.errno, res);
        }
    }
};
