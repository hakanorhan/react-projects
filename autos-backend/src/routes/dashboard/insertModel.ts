import express from "express";
import { connectToDatabase } from "../../dbConnect.js";
import { RowDataPacket } from "mysql2";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
import { AxiosDataPacketModel, Model, RequestAxiosDataModel } from "../../interfaces/types.js";
import { formularIsNumber, formularModelIsValid } from "../../helper/validHelper.js";

const insertIntoModels: string = "insert into model(model, brand_id)VALUES(?, ?)";
const selectModel: string = "SELECT model_id, model FROM model WHERE brand_id = ?";
const selectBrand: string = "SELECT brand FROM brand WHERE brand_id = ?";

export default async (req: express.Request, res: express.Response) => {
    const axiosData: RequestAxiosDataModel = req.body;

    if(!formularIsNumber(axiosData.brandid) || !formularModelIsValid(axiosData.model)) {
        insertMysqlErrorMessages(1, res);
    } else {
    
    let connection;
    try {
        connection = await connectToDatabase();
        await connection.beginTransaction();
            // query Brand
            await connection.execute(insertIntoModels, [axiosData.model, axiosData.brandid]);
            
            const queryResult = await connection.query(selectModel, [ axiosData.brandid ]);
            const result = queryResult[0] as RowDataPacket[];

            // Brand
            const queryResultBrand = await connection.query(selectBrand, [ axiosData.brandid ]);
            const resultModel = queryResultBrand as RowDataPacket[];
            const brand = resultModel[0][0].brand;

            const models: Model[] = result.map((row: RowDataPacket) => {
                const object: Model = {
                    modelId: row.model_id,
                    model: row.model
                }
                return object;
            })

            console.log(models);

            await connection.commit();
                connection.end();

            const axiosDataPacket : AxiosDataPacketModel = { message: "Erfolgreich hinzugefügt", dataModels: models, brand }
            return res.status(200).json(axiosDataPacket)
        } catch (error: any){
            connection?.rollback();
            connection?.end();
            insertMysqlErrorMessages(error.errno, res);
        }
    }

}