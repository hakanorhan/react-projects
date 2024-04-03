import express, { response } from "express";
import { pool } from "../dbConnect.js";
import ISignUpUser from "../interfaces/ISignUp.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import IRequestSignUp from "../interfaces/ISignUp.js";
import { IResponseSignup } from "../interfaces/ISignUp.js";

import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from "../enums/Roles.js";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../regex/regex.js";
import * as SignupStatements from "../statements/signupStatements.js"; 
import { AxiosDataSignup } from "../interfaces/IAxiosData.js";

// disable autocommit and perform transaction
async function performQuery(requestData: any, res: express.Response){
    const axiosData: AxiosDataSignup = requestData;
    console.log(axiosData);
    
    if(!axiosData.form.email.match(REGEX_EMAIL)) {
        return console.log("Email not matches");
    }

    if(!axiosData.form.password1!.match(REGEX_PASSWORD)) {
        return console.log("Password not matches")
    }

    const connection = await pool.getConnection();
    try {
        // start transaction
        await connection.beginTransaction();

        // Exists email
        const selectQuery = 'SELECT email FROM person WHERE email = ?';
        const queryResult = await connection.query(selectQuery, [axiosData.form.email]);
        const result = queryResult as RowDataPacket[];
        
        if(result[0].length === 1) {
            const message: IResponseSignup = { message: "Email already exists. Please try another email" }
            return res.status(409).json(message);
        }

        // passwort not matches, process password matches is used in frontend for better user experience
        if(axiosData.form.password1 !== axiosData.form.password2) {
            const message = { message: "Password not matches. Please try again" }
            return res.status(409).json(message);
        }
        
        // hash password
        const salt = genSaltSync(10);
        const hash = hashSync(axiosData.form.password1, salt);
        const streetNr = axiosData.form.street + axiosData.form.nr;
        // insert address
        const [resultAdress]: [ResultSetHeader, any] = await connection.execute(
            SignupStatements.insertAdress,
            [streetNr, axiosData.form.zipcode, axiosData.form.city, axiosData.selectedBundesland]
        );
        
        // insert adressId in user
        const addressId: number = resultAdress.insertId;

        // insert into person
        const [resultPerson]: [ResultSetHeader, any] = await connection.execute(
            SignupStatements.insertPerson,
            [axiosData.form.name, axiosData.form.familyname, axiosData.form.email, hash, axiosData.telefonNr,
            axiosData.formattedDate, addressId, Roles.USER]);
        
        const userId: number = resultPerson.insertId;

        const [resultUser]: [ResultSetHeader, any] = await connection.execute(
            SignupStatements.insertUser,
            [userId, axiosData.isCheckedDealer, axiosData.isCheckedchat, axiosData.isCheckedTelefon, axiosData.isCheckedEmail]);

            if(axiosData.isCheckedDealer) {
                await connection.execute(
                    SignupStatements.insertDealerInfo,
                    [userId, axiosData.form.companyname, axiosData.form.impressumdaten]
                )
            }
        
        await connection.commit();
        const responseData = { message: "Sie haben erfolgreich eingeloggt"} 
        return res.status(200).json(responseData)

    } catch(err) {
        // rollback
        console.error(err);
        await connection.rollback();
        const responseData = { message: "Error occured. Please try again."} 
        return res.status(500).json(responseData);
        
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

        const [resultAddress]: [ResultSetHeader, any] = await connection.execute( SignupStatements.insertAdress, ["Musterstraße 1", "45880", "Gelsenkirchen", 10] );
        const addressid: number = resultAddress.insertId;

        // hash password
        const salt = genSaltSync(10);
        const hash = hashSync("Hakan.89!", salt);

        // insert into person
        const [resultPerson]: [ResultSetHeader, any] = await connection.execute(
            SignupStatements.insertPerson,
            ["Hakan", "Orhan", "hakan@cars.de", hash, "0152000000000", "2007-12-04", addressid, Roles.ADMIN]);
        
        //const adminid: number = resultPerson.insertId;
        
        //await connection.execute( SignupStatements.insertAdmin, [adminid])

        //await connection.execute( SignupStatements.insertWhoCreatedDeletedEmployee, [adminid, adminid])
        
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
//performInsertAdmin();