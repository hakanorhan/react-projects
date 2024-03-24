import { pool } from "../dbConnect.js";
import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import * as SignupStatements from "../statements/signupStatements.js";
async function performQuery(requestData, res) {
    const { form, isChecked } = requestData;
    if (!form.email.match(REGEX_EMAIL)) {
        return console.log("Email not matches");
    }
    if (!form.password1.match(REGEX_PASSWORD)) {
        return console.log("Password not matches");
    }
    const connection = await pool.getConnection();
    try {
        console.log("is cardealer " + isChecked);
        await connection.beginTransaction();
        const selectQuery = 'SELECT email FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [form.email]);
        const result = queryResult;
        if (result[0].length === 1) {
            const message = { message: "Email already exists. Please try another email" };
            return res.status(409).json(message);
        }
        if (form.password1 !== form.password2) {
            const message = { message: "Password not matches. Please try again" };
            return res.status(409).json(message);
        }
        const salt = genSaltSync(10);
        const hash = hashSync(form.password1, salt);
        const [resultPerson] = await connection.execute(SignupStatements.insertPerson, [form.name, form.familyname, form.email, hash, Roles.USER]);
        const userId = resultPerson.insertId;
        const [resultUser] = await connection.execute(SignupStatements.insertUser, [userId, isChecked]);
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
        const salt = genSaltSync(10);
        const hash = hashSync("Hakan.89!", salt);
        const [resultPerson] = await connection.execute(SignupStatements.insertPersonFull, ["Hakan", "Orhan", "hakan@cars.de", hash, "0152000000000", "2007-12-04", Roles.ADMIN]);
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
