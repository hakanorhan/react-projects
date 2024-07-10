import express from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../constants/values.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { AxiosDataSignup } from "../interfaces/types.js";
import { connectToDatabase } from "../dbConnect.js";

export const insertAdress: string =
    `INSERT INTO address (street_nr, zipcode, city, federal_state_id) VALUES (?, ?, ?, ?)`;

export const insertPersonalData: string = 
    "INSERT INTO personal_data (forename, surename, tel_nr, birthdate, address_id) VALUES (?, ?, ?, ?, ?)";

export const insertAccountData: string =
    "INSERT INTO account_data (email, password_secret, account_role) VALUES (?, ?, ?)";

export const insertIntoContactPreffered: string =
    "INSERT INTO contact_preffered (contact_telefon, contact_email) VALUES(?, ?)";

export const insertUser: string = 
    "INSERT INTO user (personal_data_id, account_data_id, contact_preffered_id, is_car_dealer) VALUES (?, ?, ?, ?)";

export const insertIntoUserDealer: string =
    "INSERT INTO user_dealer (user_id, companyname, impressum) VALUES (?, ?, ?)";
    
// disable autocommit and perform transaction
async function performQuery(requestData: any, res: express.Response){
    const axiosData: AxiosDataSignup = requestData;
    const form = axiosData.form;
    
    if(!form.email.match(REGEX_EMAIL)) {
        return res.status(401).json( { message: "Email ungültig" } )
    }

    if(!form.password1!.match(REGEX_PASSWORD)) {
        return res.status(401).json( { message: "Password ungültig" } )
    }

            // passwort not matches, process password matches is used in frontend for better user experience
    if(form.password1 !== form.password2) {
        return res.status(401).json({ message: "Passwörter stimmen nicht überein" });
            }

    const connection = await connectToDatabase();
    try {
        // start transaction
        await connection.beginTransaction();

        // Exists email
        const selectQuery = 'SELECT email FROM account_data WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [form.email]);
        const result = queryResult as RowDataPacket[];
        
        if(result[0].length === 1) {
            return res.status(409).json({ message: "Email existiert bereits" });
        }
        
        // hash password
        const salt = genSaltSync(10);
        const hash = hashSync(axiosData.form.password1, salt);
        const streetNr = form.street + axiosData.form.nr;
        // insert address
        const [resultAdress]: [ResultSetHeader, any] = await connection.execute(
            insertAdress,
            [streetNr, form.zipcode, form.city, axiosData.selectedBundesland]
        );
        
        // insert adressId in user
        const addressId: number = resultAdress.insertId;
        const dateEnglish = axiosData.formattedDate.split('-').reverse().join('-');

        // insert into personalData
        const [resultPersonalData]: [ResultSetHeader, any] = await connection.execute(
            insertPersonalData,
            [axiosData.form.name, axiosData.form.familyname, axiosData.telefonNr, dateEnglish, addressId]);
        const personalDataId: number = resultPersonalData.insertId;

        // insert into accountData
        const [resultAccountData]: [ResultSetHeader, any] = await connection.execute(
            insertAccountData,
            [axiosData.form.email, hash, Roles.USER]);
        const accountDataId: number = resultAccountData.insertId;

        const [resultContactPreffered]: [ResultSetHeader, any] = await connection.execute(
            insertIntoContactPreffered,
            [axiosData.isCheckedTelefon, axiosData.isCheckedEmail]);
        const contactPrefferedId = resultContactPreffered.insertId;

        const [resultUser]: [ResultSetHeader, any] = await connection.execute(
            insertUser,
            [personalDataId, accountDataId, contactPrefferedId, axiosData.isCheckedDealer]
        );
        const userId = resultUser.insertId;

            if(axiosData.isCheckedDealer) {
                await connection.execute(
                    insertIntoUserDealer,
                    [userId, axiosData.form.companyname, axiosData.form.impressumdaten]
                )
            }
        
        await connection.commit();
        connection.end();
        return res.status(200).json({ message: 'Erfolgreich eingeloggt.' })

    } catch(err) {
        // rollback
        console.error(err);
        await connection.rollback();
        connection.end(); 
        return res.status(401).json({ message: "Bitte versuchen Sie es erneut." });
        
    } 
}

export default async (req: express.Request, res: express.Response) => {
    const requestData = req.body;
    performQuery(requestData, res);
}

/**
 * Perform one time.
 */

async function performInsertAdmin() {
    
    const connection = await connectToDatabase();
    try {
        // start transaction
        await connection.beginTransaction();

        const [resultAddress]: [ResultSetHeader, any] = await connection.execute( insertAdress, ["Musterstraße 1", "40213", "Düsseldorf", 10] );
        const addressid: number = resultAddress.insertId;

        
        // hash password
        const salt = genSaltSync(10);
        const hash = hashSync("Mustermann.00!", salt);

        // insert into account data
        const [resultAccountData]: [ResultSetHeader, any] = await connection.execute(
            insertAccountData,
            ["max@cars.de", hash, Roles.ADMIN]);
        const accountDataId: number = resultAccountData.insertId;
        
        // insert into personal data
        const [resultPersonalData]: [ResultSetHeader, any] = await connection.execute(
            insertPersonalData,
            ["Max", "Mustermann", "+491777777777", "2000-12-04", addressid]);
        const personalDataId: number = resultPersonalData.insertId;
        
        // insert into contact preffered
        const [resultContactPreffered]: [ResultSetHeader, any] = await connection.execute(
            insertIntoContactPreffered,
            [0, 0, 0]);
        const contactPrefferedId = resultContactPreffered.insertId;

        // insert into user
        const [resultUser]: [ResultSetHeader, any] = await connection.execute(
            insertUser,
            [personalDataId, accountDataId, contactPrefferedId, false]);
        
        await connection.commit();
        connection.end();
        console.log("admin insert committed!")
    } catch(err) {
        // rollback
        await connection.rollback();
        console.log("admin inserted Rollback!");
        
    } finally {
        // release connection
        connection.end();
    }
} 
performInsertAdmin();