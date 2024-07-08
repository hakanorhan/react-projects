import express from 'express';
import { connectToDatabase } from '../../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../../helper/messages.js';
import { AxiosDataPacketBrand, Brand } from '../../interfaces/types.js';

const selectQuery: string = 'SELECT * from brand';

/**
 * Select all brands from database.
 * @returns Brand[]
 */
export default async (req: express.Request, res: express.Response) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0] as RowDataPacket[];

        const brands: Brand[] = result.map((row: RowDataPacket) => {
            const object: Brand = {
                brandId: row.brand_id,
                brand: row.brand
            }
            return object;
        })

        connection.end();

        const axiosDataPacket: AxiosDataPacketBrand = { message: '', dataBrands: brands }

        return res.status(200).json(axiosDataPacket);
    } catch (error: any) {
        selectMysqlErrorMessages(error.code, res);
        connection?.end();
    }
}