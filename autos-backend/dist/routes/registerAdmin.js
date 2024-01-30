import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
const insertUser = `INSERT INTO ${Roles.admin} (persnr, name, familyname, email, password, grantpubliccar, grantcreateadmin, grantall, createdbyadminid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
async function performTransaction(requestData) {
    const connection = await pool.getConnection();
    const address = requestData.personinfo.address;
    try {
        await connection.beginTransaction();
        await connection.execute(insertUser, []);
        await connection.commit();
        console.log("Transaction successfully committed");
    }
    catch (err) {
        await connection.rollback();
        console.log("Rollback!!");
        throw err;
    }
    finally {
        connection.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performTransaction(requestData);
    console.log("--------------- Ausgabe: ");
};
