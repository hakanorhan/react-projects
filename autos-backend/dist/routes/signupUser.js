import { pool } from "../dbConnect.js";
import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import * as SignupStatements from "../statements/signupStatements.js";
async function performQuery(requestData, res) {
    const { name, familyname, email, password, password2, isCarDealer } = requestData;
    if (!email.match(REGEX_EMAIL)) {
        return console.log("Email not matches");
    }
    if (!password.match(REGEX_PASSWORD)) {
        return console.log("Password not matches");
    }
    const connection = await pool.getConnection();
    try {
        console.log("is cardealer " + isCarDealer);
        await connection.beginTransaction();
        const selectQuery = 'SELECT email FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [email]);
        const result = queryResult;
        if (result[0].length === 1) {
            const message = { message: "Email already exists. Please try another email" };
            return res.status(409).json(message);
        }
        if (password !== password2) {
            const message = { message: "Password not matches. Please try again" };
            return res.status(409).json(message);
        }
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const [resultPerson] = await connection.execute(SignupStatements.insertPerson, [name, familyname, email, hash, Roles.USER]);
        const userId = resultPerson.insertId;
        const [resultUser] = await connection.execute(SignupStatements.insertUser, [userId, isCarDealer]);
        await connection.commit();
        const responseData = { message: "Sie haben erfolgreich eingeloggt" };
        return res.status(200).json(responseData);
    }
    catch (err) {
        await connection.rollback();
        const responseData = { message: "Error occured. Please try again." };
        return res.status(500).json(responseData);
    }
    finally {
        connection.release();
    }
}
export default async (req, res) => {
    const requestData = req.body;
    performQuery(requestData, res);
};
async function performInsertAdmin() {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resultAddress] = await connection.execute(SignupStatements.insertAdress, ["Musterstraße 1", "45880", "Gelsenkirchen", 10]);
        const addressid = resultAddress.insertId;
        const salt = genSaltSync(10);
        const hash = hashSync("!.Cars1+40", salt);
        const [resultPerson] = await connection.execute(SignupStatements.insertPersonFull, ["Hakan", "Orhan", "hakan@cars.de", hash, "0152000000000", "2007-12-04", addressid, Roles.ADMIN]);
        const adminid = resultPerson.insertId;
        await connection.execute(SignupStatements.insertAdmin, [adminid]);
        await connection.execute(SignupStatements.insertWhoCreatedDeletedEmployee, [adminid, adminid]);
        await connection.commit();
        console.log("committed!");
    }
    catch (err) {
        await connection.rollback();
        console.log("Rollback!");
    }
    finally {
        connection.release();
    }
}
