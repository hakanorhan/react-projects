import { connectToDatabase } from "../../dbConnect.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const UPDATE = "update inserate_check set inserate_public = ? WHERE inserate_id = ?";
const UPDATE_CANCELLED = " UPDATE inserate_check set inserate_public = 0, inserate_cancelled = 1 WHERE inserate_id = ?";
export default async (req, res) => {
    const axiosData = req.body;
    let connection;
    try {
        connection = await connectToDatabase();
        let message;
        await connection.beginTransaction();
        if (axiosData.canPublish) {
            await connection.execute(UPDATE, [axiosData.canPublish, axiosData.inserateId]);
            message = "Inserat freigegeben";
        }
        else {
            await connection.execute(UPDATE_CANCELLED, [axiosData.inserateId]);
            message = "Inserat nicht freigegeben";
        }
        await connection.commit();
        connection.end();
        return res.status(200).json({ message });
    }
    catch (error) {
        console.log(error);
        connection?.rollback();
        connection?.end();
        insertMysqlErrorMessages(error.errno, res);
    }
};
