import express, { response } from "express";
import { pool } from "../dbConnect.js";
import ISignUpUser from "../interfaces/ISignUp.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import IRequestSignUp from "../interfaces/ISignUp.js";
import { IResponseSignup } from "../interfaces/ISignUp.js";

import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import { AxiosDataSignup } from "../interfaces/IAxiosData.js";

export const insertAdress: string =
    `INSERT INTO address (street_nr, zipcode, city, federal_state_id) VALUES (?, ?, ?, ?)`;

export const insertPersonalData: string = 
    "INSERT INTO personal_data (forename, surename, tel_nr, birthdate, address_id) VALUES (?, ?, ?, ?, ?)";

export const insertAccountData: string =
    "INSERT INTO account_data (email, password_secret, account_role) VALUES (?, ?, ?)";

export const insertIntoContactPreffered: string =
    "INSERT INTO contact_preffered (contact_telefon, contact_email, contact_chat) VALUES(?, ?, ?)";

export const insertUser: string = 
    "INSERT INTO user (personal_data_id, account_data_id, contact_preffered_id, is_car_dealer) VALUES (?, ?, ?, ?)";

export const insertIntoUserDealer: string =
    "INSERT INTO user_dealer (user_id, companyname, impressum) VALUES (?, ?, ?)";
    
// disable autocommit and perform transaction
async function performQuery(requestData: any, res: express.Response){
    const axiosData: AxiosDataSignup = requestData;
    const form = axiosData.form;
    console.log(axiosData);
    
    if(!form.email.match(REGEX_EMAIL)) {
        const iResponseSignUp: IResponseSignup = { message: "Email ungültig" }
        return res.status(401).json( iResponseSignUp )
    }

    if(!form.password1!.match(REGEX_PASSWORD)) {
        const iResponseSignUp: IResponseSignup = { message: "Password ungültig" }
        return res.status(401).json( iResponseSignUp )
    }

            // passwort not matches, process password matches is used in frontend for better user experience
    if(form.password1 !== form.password2) {
        const iResponseSignUp: IResponseSignup = { message: "Passwörter stimmen nicht überein" }
        return res.status(401).json(iResponseSignUp);
            }

    const connection = await pool.getConnection();
    try {
        // start transaction
        await connection.beginTransaction();

        // Exists email
        const selectQuery = 'SELECT email FROM account_data WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [form.email]);
        const result = queryResult as RowDataPacket[];
        
        if(result[0].length === 1) {
            const iResponseSignUp: IResponseSignup = { message: "Email existiert bereits" }
            return res.status(409).json(iResponseSignUp);
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
            [axiosData.isCheckedTelefon, axiosData.isCheckedEmail, axiosData.isCheckedchat]);
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
        const iResponseSignUp: IResponseSignup = { message: "Sie haben erfolgreich eingeloggt"} 
        return res.status(200).json(iResponseSignUp)

    } catch(err) {
        // rollback
        console.error(err);
        await connection.rollback();
        const iResponseSignUp: IResponseSignup = { message: "Bitte versuchen Sie es erneut."} 
        return res.status(401).json(iResponseSignUp);
        
    } finally {
        // release connection
        connection.release();
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
    
    const connection = await pool.getConnection();
    try {
        // start transaction
        await connection.beginTransaction();

        const [resultAddress]: [ResultSetHeader, any] = await connection.execute( insertAdress, ["Musterstraße 1", "40213", "Düsseldorf", 10] );
        const addressid: number = resultAddress.insertId;

        
        // hash password
        const salt = genSaltSync(10);
        const hash = hashSync("Hakan.89!", salt);

        // insert into account data
        const [resultAccountData]: [ResultSetHeader, any] = await connection.execute(
            insertAccountData,
            ["hakan@cars.de", hash, Roles.ADMIN]);
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
        console.log("committed!")
    } catch(err) {
        // rollback
        await connection.rollback();
        console.log("Rollback!");
        
    } finally {
        // release connection
        connection.release();
    }
} 
performInsertAdmin();