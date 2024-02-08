import { pool } from "../dbConnect.js";
import { Roles } from "../enums/Roles.js";
const insertAddress = 'INSERT INTO address (streetnr, zipcode, city, blandid) VALUES (?, ?, ?, ?)';
const insertPerson = `INSERT INTO ${Roles.person} (name, familyname, email, password, telnr, birth, isactive, addressid) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
const insertAdmin = `INSERT INTO ${Roles.admin} (adminid) VALUES(?)`;
const insertWhoCreateDelete = `INSERT INTO whocreatedeletedemployee (personid, createdfrom)
    VALUES (?, ?)`;
async function performTransaction(requestData) {
    const connection = await pool.getConnection();
    const person = requestData.personinfo;
    const address = requestData.personinfo.address;
    const whoCreateDelete = requestData.whoCreateDelete;
    try {
        await connection.beginTransaction();
        const [resultAddress] = await connection.execute(insertAddress, [address.streetnr, address.zipcode, address.city, address.blandid]);
        const addressId = resultAddress.insertId;
        const [resultAdmin] = await connection.execute(insertPerson, [person.name, person.familyname, person.email, person.password1, person.telnr,
            person.birth, person.isactive, addressId]);
        const newAdminId = resultAdmin.insertId;
        await connection.execute(insertAdmin, [newAdminId]);
        await connection.execute(insertWhoCreateDelete, [newAdminId, whoCreateDelete.createdFrom]);
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
