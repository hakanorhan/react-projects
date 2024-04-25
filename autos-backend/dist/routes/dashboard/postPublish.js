import { pool } from "../../dbConnect.js";
import { insertMysqlErrorMessages } from "../../helper/messages.js";
const UPDATE = "update inserate_check set inserate_public = ? WHERE inserate_id = ?";
const UPDATE_CANCELLED = " UPDATE inserate_check set inserate_public = 0, inserate_cancelled = 1 WHERE inserate_id = ?";
export default async (req, res) => {
    const axiosData = req.body;
    let connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        if (axiosData.canPublish)
            await connection.execute(UPDATE, [axiosData.canPublish, axiosData.inserateId]);
        else {
            console.log(axiosData.canPublish);
            await connection.execute(UPDATE_CANCELLED, [axiosData.inserateId]);
        }
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich hinzugefügt' });
    }
    catch (error) {
        console.log(error);
        connection.rollback();
        insertMysqlErrorMessages(error.errno, res);
    }
    finally {
        connection.release();
    }
};
