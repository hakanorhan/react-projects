import express from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ResultSetHeader } from "mysql2";
import { pool } from "../dbConnect.js";
import { AxiosDataInserate } from "../interfaces/IAxiosData.js";
import { DecodedToken, verifyUserJwt } from "../jwt/authenticate.js";

const INSERT_INTO_ADVERTISEINFO: string = "INSERT INTO advertiseinfo (userid) VALUES(?)";
const INSERT_INTO_CARS : string 
    = "INSERT INTO cars(modelid, price, km, cartypeid, year, month, transmissionid, advertiseinfoid, fuelid, ps, hubraum, doorid, previousowner, aunew, hunew, accident ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

export default async (req: express.Request, res: express.Response) => {
    const accessToken = req.cookies.jwt;
    // if jwt exists
    console.log("Wird öfters ausgeführt!")
    const token: DecodedToken = await verifyUserJwt(accessToken);
    const data: AxiosDataInserate = req.body;
    // TODO: message user not authenticated
    performQuery(data, token.id, res)
    
}


async function performQuery(data: AxiosDataInserate, userId: string, res: express.Response) {

    const inserateSelect = data.inserateSelect;
    const inserateData = data.inserateData;
    const inserateCheckBox = data.inserateCheckbox;

    const connection = await pool.getConnection();
    try {
        // start transaction
        await connection.beginTransaction();

        // advertise info
        const [resultAdvertise]: [ResultSetHeader, any] = await connection.execute(
            INSERT_INTO_ADVERTISEINFO,
            [userId]);
        const advertiseId = resultAdvertise.insertId;

        // insert into person
         await connection.execute( INSERT_INTO_CARS,
            [inserateSelect.model, inserateData.price, inserateData.km, inserateSelect.cartype, inserateData.year, inserateData.month,
                inserateSelect.transmissionname, advertiseId, inserateSelect.fuelname, inserateData.ps, inserateData.hubraum, inserateSelect.doors, inserateData.previousOwner,
                inserateCheckBox.auNew, inserateCheckBox.huNew, inserateCheckBox.unfallFahrzeug]);
        
        await connection.commit();
        return res.status(200).json({ message: 'Erfolgreich' })
        
    } catch(err) {
        // rollback
        await connection.rollback();
        console.log(err);
        
    } finally {
        // release connection
        connection.release();
    }
}
