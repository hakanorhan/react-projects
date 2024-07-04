import express from 'express';
import { connectToDatabase } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { AxiosDetailsearch } from '../interfaces/types.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
import { formularIsNumber } from '../helper/validHelper.js';
import { Roles } from '../constants/values.js';

    const updateClick: string = "UPDATE inserate i " 
    + " JOIN inserate_check ic ON i.inserate_id = ic.inserate_id"
    + " JOIN inserate_info ii ON i.inserate_info_id = ii.inserate_info_id"
    + " SET clicks = clicks+ 1"
    + " WHERE i.inserate_id = ? AND ic.inserate_public = 1 AND ii.is_active = 1";;

export default async (req: express.Request, res: express.Response) => {
    const inserateId = req.params.id;
    let conditionRole;
    
    let role = Roles.NULL;
    if(req.user) {
        role = (req.user as any).role;
    conditionRole = (role === Roles.ADMIN 
        ? "AND ic.inserate_public = 0" 
        : "AND ic.inserate_public = 1");
    } else {
        conditionRole = "AND ic.inserate_public = 1";  
    }

    let query: string = `SELECT i.*, ii.*, ic.*, ud.*, a.*, fs.*, cp.*, m.*, b.*, td.*, f.*, d.*, vc.*, ct.*, fe.*, tr.*, c.*, t.*, pd.*, YEAR(ac.created_date) AS since
    FROM inserate i, inserate_info ii, inserate_check ic, user u LEFT JOIN user_dealer ud ON ud.user_id = u.user_id,  personal_data pd, account_data ac, address a, federal_state fs, contact_preffered cp, model m, brand b, technical_description td, fuel f, door d, vehicle_condition vc, cartype ct, feature fe, transmission tr, clima c, tuev t
    WHERE i.inserate_id = ? 
      AND i.entwurf = 0 
      ${conditionRole}
      AND ii.inserate_info_id = i.inserate_info_id 
      AND ic.inserate_id = i.inserate_id
      AND u.user_id = ii.user_id 
      AND pd.personal_data_id = u.personal_data_id 
      AND ac.account_data_id = u.account_data_id 
      AND a.address_id = pd.address_id 
      AND fs.federal_state_id = a.federal_state_id 
      AND cp.contact_preffered_id = u.contact_preffered_id 
      AND m.model_id = i.model_id 
      AND b.brand_id = m.brand_id 
      AND td.technical_description_id = i.technical_description_id 
      AND td.fuel_id = f.fuel_id 
      AND d.door_id = td.door_id 
      AND vc.vehicle_condition_id = td.vehicle_condition_id 
      AND ct.cartype_id = td.cartype_id 
      AND fe.feature_id = td.feature_id 
      AND tr.transmission_id = td.transmission_id 
      AND c.clima_id = td.clima_id 
      AND t.tuev_id = td.tuev_id;
    `;


    if(!formularIsNumber(inserateId)) {
        selectMysqlErrorMessages("error id", res);
    } else {
    let connection;
    try {
        connection = await connectToDatabase();
            
        
        const queryResult = await connection.execute(query, [inserateId]);
        
        const result = queryResult[0] as RowDataPacket[];
        console.log(result[0])
        if(result[0] !== undefined ) { 
        const { inserate_id, brand, model, price, cartype, mileage_km, registration_year, registration_month, transmission, inserate_date, power_ps, vehicle_owners, cubic_capacity,
             au_new, hu_new, door, accident, fuel,
             is_car_dealer, clima, description_car, scheckheft, fit_to_drive, abstandstempomat, ambientbeleuchtung, headupdisplay, totwinkelassistent, color, city, federal_state,
             zipcode, companyname, impressum, forename, surename, tel_nr, street_nr, since, name, familyname } = result[0];
        
        const axiosData: AxiosDetailsearch = {
            inseratId: inserate_id, model, brand, price, mileageKm: mileage_km, registrtionYear: registration_year, registrationMonth: registration_month, powerPS: power_ps, vehicleOwners: vehicle_owners,
            cartype, accident, fuel, transmission, inserateDate: inserate_date , cubicCapacity: cubic_capacity, auNew: au_new,
            huNew: hu_new, doors: door, isCardealer: is_car_dealer, clima, description: description_car, scheckheft, fittodrive: fit_to_drive, abstandstempomat, ambientbeleuchtung,
            headupdisplay, totwinkelassistent, color, city, federalState: federal_state, zipcode, companyName: companyname, impressum, foreName: forename, sureName: surename,
            telNr: tel_nr, streetNr: is_car_dealer ? street_nr : null, since, contactPerson: is_car_dealer ? name : null, contactPersonSurname: is_car_dealer ? familyname : null
        }
        if(req.user) {
            if((req.user as any).role !== Roles.ADMIN) {
                connection.execute(updateClick, [inserateId]);
            }
        }
        

        connection.end();
        return res.status(200).json( axiosData );
    } else {
        return res.status(200).json( undefined );
    }
    } catch (error: any) {
        connection?.end();
        selectMysqlErrorMessages(error.code, res);  
    } 
}
}