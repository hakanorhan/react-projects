import { pool } from "../dbConnect.js";
import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
export const insertAdress = `INSERT INTO address (street_nr, zipcode, city, federal_state_id) VALUES (?, ?, ?, ?)`;
export const insertPersonalData = "INSERT INTO personal_data (forename, surename, tel_nr, birthdate, address_id) VALUES (?, ?, ?, ?, ?)";
export const insertAccountData = "INSERT INTO account_data (email, password_secret, account_role) VALUES (?, ?, ?)";
export const insertIntoContactPreffered = "INSERT INTO contact_preffered (contact_telefon, contact_email, contact_chat) VALUES(?, ?, ?)";
export const insertUser = "INSERT INTO user (personal_data_id, account_data_id, contact_preffered_id, is_car_dealer) VALUES (?, ?, ?, ?)";
export const insertIntoUserDealer = "INSERT INTO user_dealer (user_id, companyname, impressum) VALUES (?, ?, ?)";
async function performQuery(requestData, res) {
    const axiosData = requestData;
    const form = axiosData.form;
    console.log(axiosData);
    if (!form.email.match(REGEX_EMAIL)) {
        const iResponseSignUp = { message: "Email ungültig" };
        return res.status(401).json(iResponseSignUp);
    }
    if (!form.password1.match(REGEX_PASSWORD)) {
        const iResponseSignUp = { message: "Password ungültig" };
        return res.status(401).json(iResponseSignUp);
    }
    if (form.password1 !== form.password2) {
        const iResponseSignUp = { message: "Passwörter stimmen nicht überein" };
        return res.status(401).json(iResponseSignUp);
    }
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const selectQuery = 'SELECT email FROM account_data WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [form.email]);
        const result = queryResult;
        if (result[0].length === 1) {
            const iResponseSignUp = { message: "Email existiert bereits" };
            return res.status(409).json(iResponseSignUp);
        }
        const salt = genSaltSync(10);
        const hash = hashSync(axiosData.form.password1, salt);
        const streetNr = form.street + axiosData.form.nr;
        const [resultAdress] = await connection.execute(insertAdress, [streetNr, form.zipcode, form.city, axiosData.selectedBundesland]);
        const addressId = resultAdress.insertId;
        const dateEnglish = axiosData.formattedDate.split('-').reverse().join('-');
        const [resultPersonalData] = await connection.execute(insertPersonalData, [axiosData.form.name, axiosData.form.familyname, axiosData.telefonNr, dateEnglish, addressId]);
        const personalDataId = resultPersonalData.insertId;
        const [resultAccountData] = await connection.execute(insertAccountData, [axiosData.form.email, hash, Roles.USER]);
        const accountDataId = resultAccountData.insertId;
        const [resultContactPreffered] = await connection.execute(insertIntoContactPreffered, [axiosData.isCheckedTelefon, axiosData.isCheckedEmail, axiosData.isCheckedchat]);
        const contactPrefferedId = resultContactPreffered.insertId;
        const [resultUser] = await connection.execute(insertUser, [personalDataId, accountDataId, contactPrefferedId, axiosData.isCheckedDealer]);
        const userId = resultUser.insertId;
        if (axiosData.isCheckedDealer) {
            await connection.execute(insertIntoUserDealer, [userId, axiosData.form.companyname, axiosData.form.impressumdaten]);
        }
        await connection.commit();
        const iResponseSignUp = { message: "Sie haben erfolgreich eingeloggt" };
        return res.status(200).json(iResponseSignUp);
    }
    catch (err) {
        console.error(err);
        await connection.rollback();
        const iResponseSignUp = { message: "Bitte versuchen Sie es erneut." };
        return res.status(401).json(iResponseSignUp);
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
        const [resultAddress] = await connection.execute(insertAdress, ["Musterstraße 1", "40213", "Düsseldorf", 10]);
        const addressid = resultAddress.insertId;
        const salt = genSaltSync(10);
        const hash = hashSync("Hakan.89!", salt);
        const [resultAccountData] = await connection.execute(insertAccountData, ["hakan@cars.de", hash, Roles.ADMIN]);
        const accountDataId = resultAccountData.insertId;
        const [resultPersonalData] = await connection.execute(insertPersonalData, ["Max", "Mustermann", "+491777777777", "2000-12-04", addressid]);
        const personalDataId = resultPersonalData.insertId;
        const [resultContactPreffered] = await connection.execute(insertIntoContactPreffered, [0, 0, 0]);
        const contactPrefferedId = resultContactPreffered.insertId;
        const [resultUser] = await connection.execute(insertUser, [personalDataId, accountDataId, contactPrefferedId, false]);
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
