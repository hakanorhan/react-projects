import express from "express";
import { connectToDatabase } from "../../dbConnect.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
import { AxiosDataPacketBrand } from "../../interfaces/types.js";

const insertIntoBrand: string = "INSERT INTO brand (brand) VALUES (?)";
const selectBrandQuery: string = "SELECT * FROM brand";
import { Brand } from "../../interfaces/types.js";
import { formularNameValid } from "../../helper/validHelper.js";
export default async (req: express.Request, res: express.Response) => {
    const { value } = req.body;

    if (!formularNameValid(value)) {
        insertMysqlErrorMessages(1, res);
    } else {

        console.log(value);
        let connection;
        try {
            connection = await connectToDatabase();
            await connection.beginTransaction();
            // query Brand
            const [resultBrand]: [ResultSetHeader, any] = await connection.execute(insertIntoBrand, [value]);
            const insertId = resultBrand.insertId;

            const queryResult = await connection.query(selectBrandQuery);
            const result = queryResult[0] as RowDataPacket[];

            const brands: Brand[] = result.map((row: RowDataPacket) => {
                const object: Brand = {
                    brandId: row.brand_id,
                    brand: row.brand
                }
                return object;
            })

            const axiosDataPacket: AxiosDataPacketBrand = { message: "Erfolgreich hinzugefügt", dataBrands: brands }

            await connection.commit();
            connection.end();
            return res.status(200).json(axiosDataPacket)
        } catch (error: any) {
            connection?.rollback();
            connection?.end();
            insertMysqlErrorMessages(error.errno, res);

        }
    }
}