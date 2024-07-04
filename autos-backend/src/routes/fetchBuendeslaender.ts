import express from 'express';
import { connectToDatabase } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../helper/messages.js';

const selectQuery: string = 'SELECT * from federal_state';

export default async (req: express.Request, res: express.Response) => {
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.execute(selectQuery);
        const result = queryResult[0] as RowDataPacket[];
        connection.end();
        return res.status(200).json({ message: 'Data send', tableValues: result });
    } catch (error: any) {
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
}