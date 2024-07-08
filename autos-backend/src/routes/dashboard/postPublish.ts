import express from "express";
import { connectToDatabase } from "../../dbConnect.js";
import { AxiosDataPublish } from "../../interfaces/IAxiosData.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const UPDATE: string = "update inserate_check set inserate_public = ? WHERE inserate_id = ?";
const UPDATE_CANCELLED: string = " UPDATE inserate_check set inserate_public = 0, inserate_cancelled = 1 WHERE inserate_id = ?";

/**
 * Publish or cancel inserates.
 */
export default async (req: express.Request, res: express.Response) => {
    const axiosData: AxiosDataPublish = req.body;

    let connection;
    try {
        connection = await connectToDatabase();
        let message;
        await connection.beginTransaction();
        // query Brand
        if (axiosData.canPublish) {
            await connection.execute(UPDATE, [axiosData.canPublish, axiosData.inserateId]);
            message = "Inserat freigegeben";
        } else {
            await connection.execute(UPDATE_CANCELLED, [axiosData.inserateId]);
            message = "Inserat nicht freigegeben"
        }
        await connection.commit();
        connection.end();
        return res.status(200).json({ message })
    } catch (error: any) {
        console.log(error)
        connection?.rollback();
        connection?.end();
        insertMysqlErrorMessages(error.errno, res);
    }

}