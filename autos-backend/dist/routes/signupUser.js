import { pool } from "../dbConnect.js";
import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import * as SignupStatements from "../statements/signupStatements.js";
async function performQuery(requestData, res) {
    const axiosData = requestData;
    console.log(axiosData);
    if (!axiosData.form.email.match(REGEX_EMAIL)) {
        return console.log("Email not matches");
    }
    if (!axiosData.form.password1.match(REGEX_PASSWORD)) {
        return console.log("Password not matches");
    }
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const selectQuery = 'SELECT email FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [axiosData.form.email]);
        const result = queryResult;
        if (result[0].length === 1) {
            const message = { message: "Email already exists. Please try another email" };
            return res.status(409).json(message);
        }
        if (axiosData.form.password1 !== axiosData.form.password2) {
            const message = { message: "Password not matches. Please try again" };
            return res.status(409).json(message);
        }
        const salt = genSaltSync(10);
        const hash = hashSync(axiosData.form.password1, salt);
        const streetNr = axiosData.form.street + axiosData.form.nr;
        const [resultAdress] = await connection.execute(SignupStatements.insertAdress, [streetNr, axiosData.form.zipcode, axiosData.form.city, axiosData.selectedBundesland]);
        const addressId = resultAdress.insertId;
        const [resultPerson] = await connection.execute(SignupStatements.insertPerson, [axiosData.form.name, axiosData.form.familyname, axiosData.form.email, hash, axiosData.telefonNr,
            axiosData.formattedDate, addressId, Roles.USER]);
        const userId = resultPerson.insertId;
        const [resultUser] = await connection.execute(SignupStatements.insertUser, [userId, axiosData.isCheckedDealer, axiosData.isCheckedchat, axiosData.isCheckedTelefon, axiosData.isCheckedEmail]);
        if (axiosData.isCheckedDealer) {
            await connection.execute(SignupStatements.insertDealerInfo, [userId, axiosData.form.companyname, axiosData.form.impressumdaten]);
        }
        await connection.commit();
        const responseData = { message: "Sie haben erfolgreich eingeloggt" };
        return res.status(200).json(responseData);
    }
    catch (err) {
        console.error(err);
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
        const hash = hashSync("Hakan.89!", salt);
        const [resultPerson] = await connection.execute(SignupStatements.insertPerson, ["Hakan", "Orhan", "hakan@cars.de", hash, "0152000000000", "2007-12-04", addressid, Roles.ADMIN]);
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
