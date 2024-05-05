import express from "express";
import { ResultSetHeader } from "mysql2";
import { pool } from "../dbConnect.js";
import { AxiosDataInserate as AxiosDataInserateRequest, AxiosInserateResponse } from "../interfaces/IAxiosData.js";
import { insertMysqlErrorMessages } from "../helper/messages.js";

const INSERT_INSERATE_INFO: string = "INSERT INTO inserate_info (user_id) VALUES(?)";
const INSERT_INSERATE_CHECK: string = "INSERT INTO inserate_check (inserate_id) VALUES(?)";
const INSERT_TUEV: string = "INSERT INTO tuev (hu_new, au_new, scheckheft) VALUES(?, ?, ?)";
const INSERT_VEHICLE_CONDITION = "INSERT INTO vehicle_condition (accident, fit_to_drive) VALUES(?, ?)";
const INSERT_INTO_TECH_DESCRIPTION = "INSERT INTO technical_description (power_ps, mileage_km, cartype_id, registration_year, registration_month, transmission_id, fuel_id, cubic_capacity, door_id, vehicle_owners, tuev_id, color, clima_id, vehicle_condition_id, description_car, feature_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const INSERT_INSERATE = "INSERT INTO inserate (price, model_id, technical_description_id, inserate_info_id) VALUES(?, ?, ?, ?)";
const INSERT_FEATURE = "INSERT INTO feature (abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent) VALUES(?, ?, ?, ?)";

export default async (req: express.Request, res: express.Response) => {
    

    const data: AxiosDataInserateRequest = req.body;
    // TODO: message user not authenticated
    // TODO: userId
    performQuery(data, "2",res)
    
}

async function performQuery(data: AxiosDataInserateRequest, userId: string, res: express.Response) {

    const inserateSelect = data.inserateSelect;
    const inserateData = data.inserateData;
    const inserateCheckBox = data.inserateCheckbox;

    console.log(JSON.stringify(inserateSelect) + " " + JSON.stringify(inserateData) + " " + JSON.stringify(inserateCheckBox));

    const connection = await pool.getConnection();
    try {
        // start transaction
        await connection.beginTransaction();

        const [resultInserateInfo]: [ResultSetHeader, any] = await connection.execute(INSERT_INSERATE_INFO, [userId]);
        const inserateInfoId = resultInserateInfo.insertId;

        // TÜV
        const [resultTuev]: [ResultSetHeader, any] = await connection.execute(INSERT_TUEV, [inserateCheckBox.huNew, inserateCheckBox.auNew, inserateCheckBox.scheckheft]);
        const tuevId = resultTuev.insertId;

        // VEHICLE CONDITION
        const [resultVehicleCondition]: [ResultSetHeader, any] = await connection.execute(INSERT_VEHICLE_CONDITION, [inserateCheckBox.unfallFahrzeug, inserateCheckBox.fittodrive]);
        const vehicleConditionId = resultVehicleCondition.insertId;

        const [resultFeature]: [ResultSetHeader, any] = await connection.execute(INSERT_FEATURE, 
            [inserateCheckBox.abstandstempomat, inserateCheckBox.ambientbeleuchtung, inserateCheckBox.headupdisplay, inserateCheckBox.totwinkelassistent]);
        const featureId = resultFeature.insertId;
        
        // 
         const [resultTechDescription]: [ResultSetHeader, any] = await connection.execute( INSERT_INTO_TECH_DESCRIPTION,
            [inserateData.ps, inserateData.km, inserateSelect.cartype, inserateData.year, inserateData.month, inserateSelect.transmission, inserateSelect.fuel,
                inserateData.hubraum, inserateSelect.door, inserateData.previousOwner, tuevId, inserateData.color, data.klima, vehicleConditionId, inserateData.description, featureId]);
        const techDescriptionId = resultTechDescription.insertId;

        const [resultInserate]: [ResultSetHeader, any] = await connection.execute(INSERT_INSERATE,
            [inserateData.price, inserateSelect.model, techDescriptionId, inserateInfoId]);
        const inserateId = resultInserate.insertId;
        
        // TODO: id
        await connection.execute(INSERT_INSERATE_CHECK, [inserateId]);

        const axiosData: AxiosInserateResponse = { carId: inserateId, message:'succes' };

        await connection.commit();
        return res.status(200).json( axiosData )
        
    } catch(error: any) {
        // rollback
        await connection.rollback();
        console.log(error);
        insertMysqlErrorMessages(error.errno, res);
        
    } finally {
        // release connection
        connection.release();
    }
}
