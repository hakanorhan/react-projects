import express from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ResultSetHeader } from "mysql2";
import { pool } from "../dbConnect.js";
import { AxiosDataInserate as AxiosDataInserateRequest, AxiosInserateResponse } from "../interfaces/IAxiosData.js";
import { DecodedToken, verifyUserJwt } from "../jwt/checkAuth.js";

const INSERT_INTO_ADVERTISEINFO: string = "INSERT INTO advertiseinfo (userid) VALUES(?)";
const INSERT_INTO_CARS : string 
    = "INSERT INTO cars(modelid, price, km, cartypeid, year, month, transmissionid, advertiseinfoid, fuelid, ps, hubraum, doorid, previousowner, aunew, hunew, accident, klimaid, description, scheckheft, fittodrive, abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent ) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

export default async (req: express.Request, res: express.Response) => {
    const accessToken = req.cookies.jwt;
    // if jwt exists
    console.log("Wird öfters ausgeführt!")
    const token: DecodedToken = await verifyUserJwt(accessToken);
    const data: AxiosDataInserateRequest = req.body;
    // TODO: console.log
    console.log(data.inserateSelect.brand + " " + data.inserateSelect.model)
    // TODO: message user not authenticated
    performQuery(data, token.id, res)
    
}

async function performQuery(data: AxiosDataInserateRequest, userId: string, res: express.Response) {

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

         const [resultCarId]: [ResultSetHeader, any] = await connection.execute( INSERT_INTO_CARS,
            [inserateSelect.model, inserateData.price, inserateData.km, inserateSelect.cartype, inserateData.year, inserateData.month,
                inserateSelect.transmissionname, advertiseId, inserateSelect.fuelname, inserateData.ps, inserateData.hubraum, inserateSelect.doors, inserateData.previousOwner,
                inserateCheckBox.auNew, inserateCheckBox.huNew, inserateCheckBox.unfallFahrzeug, data.klima, inserateData.description, inserateCheckBox.scheckheft,
                inserateCheckBox.fittodrive, inserateCheckBox.abstandstempomat, inserateCheckBox.ambientbeleuchtung, inserateCheckBox.headupdisplay, inserateCheckBox.totwinkelassistent]);
        
        const carId = resultCarId.insertId;

        const axiosData: AxiosInserateResponse = { carId: carId, message:'succes' };

        await connection.commit();
        return res.status(200).json( axiosData )
        
    } catch(err) {
        // rollback
        await connection.rollback();
        console.log(err);
        
    } finally {
        // release connection
        connection.release();
    }
}
