import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
const insertAddress = 'INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)';
const insertPerson = `INSERT INTO ${Roles.person} (name, familyname, email, password, telnr, birth, isactive, addressid) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
const insertUser = `INSERT INTO ${Roles.user} (userid, iscardealer) VALUES (?, ?)`;
async function performTransaction(requestData) {
    const connection = await pool.getConnection();
    const address = requestData.personinfo.address;
    const personinfo = requestData.personinfo;
    try {
        await connection.beginTransaction();
        const [result] = await connection.execute(insertAddress, [address.streetnr, address.zipcode, address.city, address.blandid]);
        const addressId = result.insertId;
        await connection.execute(insertPerson, [personinfo.name, personinfo.familyname, personinfo.email, personinfo.password1,
            personinfo.telnr, personinfo.birth, personinfo.isactive, addressId]);
        const userId = result.insertId;
        await connection.execute(insertUser, [userId, requestData.isCardealer]);
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
