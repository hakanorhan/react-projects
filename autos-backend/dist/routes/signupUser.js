import { pool } from "../dbConnect.js";
import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
const insertPerson = `INSERT INTO ${Roles.person} (name, familyname, email, password, role) VALUES (?, ?, ?, ?, ?);`;
const insertUser = `INSERT INTO ${Roles.user} (userid, iscardealer) VALUES(?, ?)`;
async function performQuery(requestData, res) {
    const connection = await pool.getConnection();
    try {
        const { name, familyname, email, password, password2, isCarDealer } = requestData;
        console.log("is cardealer " + isCarDealer);
        await connection.beginTransaction();
        const selectQuery = 'SELECT email FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult;
        if (result[0].length === 1) {
            console.log(result[0]);
            return;
        }
        if (password !== password2) {
            return;
        }
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const [resultPerson] = await connection.execute(insertPerson, [name, familyname, email, hash, Roles.user]);
        const userId = resultPerson.insertId;
        const [resultUser] = await connection.execute(insertUser, [userId, isCarDealer]);
        await connection.commit();
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
    performQuery(requestData, res);
    console.log("--------------- Ausgabe: ");
};
