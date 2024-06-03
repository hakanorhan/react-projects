import express from 'express';
import { connectToDatabase } from '../dbConnect1.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../helper/messages.js';
import { AxiosPaperList } from '../interfaces/IAxiosData.js';
import { DisplayTypes } from '../enums/DisplayTypes.js';

export async function fetchClickedCars(req: express.Request, res: express.Response) {

    const limit: number = parseInt(req.body.limit);
    const offset: number = parseInt(req.body.offset);
    const type = req.body.type;

        if (isNaN(limit) || isNaN(offset)) {
            return selectMysqlErrorMessages("ER_PARSE_ERROR", res);
        }

    console.log("limit: " + limit + 'offset: ' + offset)

    const whereClause: string[] = [" i.inserate_id = ic.inserate_id AND i.entwurf = 0 AND ic.inserate_public = 1 AND ic.inserate_cancelled = 0 ", " AND ii.inserate_info_id = i.inserate_info_id AND ii.is_active = 1 AND i.technical_description_id = td.technical_description_id AND td.fuel_id = f.fuel_id AND td.vehicle_condition_id = vc.vehicle_condition_id AND td.transmission_id = t.transmission_id AND td.cartype_id = ct.cartype_id "];

    const attributes = " i.inserate_id, b.brand, m.model, i.price, ad.city, fs.federal_state, td.vehicle_owners, td.mileage_km, td.registration_year, td.registration_month, td.power_ps, f.fuel, vc.fit_to_drive, t.transmission, ct.cartype, u.is_car_dealer ";

    let query = "SELECT " + attributes + " FROM inserate i, inserate_check ic, inserate_info ii, brand b, model m, cartype ct, technical_description td, user u, personal_data pd, address ad, federal_state fs, fuel f, transmission t, vehicle_condition vc";

    query = query + " WHERE ";

    whereClause.push(" AND m.model_id = i.model_id ");

    whereClause.push(" AND m.brand_id = b.brand_id ");

    whereClause.push(" AND ct.cartype_id = td.cartype_id ");

    whereClause.push(" AND i.inserate_info_id = ii.inserate_info_id AND ii.user_id = u.user_id AND u.personal_data_id = pd.personal_data_id AND pd.address_id = ad.address_id AND ad.federal_state_id = fs.federal_state_id ");

    if(type === DisplayTypes.ELECTRIC) {
        whereClause.push(' AND f.fuel_id = 4 ');
    }

    whereClause.map((clause) => {
        query = query + clause;
    })

    query = query + (type === DisplayTypes.MOST_CLICKED ? " ORDER BY i.clicks DESC, i.price DESC, td.registration_year DESC" : " ");
    
    query = query + " LIMIT ? OFFSET ?";
    let connection;
    try {
        connection = await connectToDatabase();

        const queryResult = await connection.query(query, [limit, offset]);
        const result = queryResult as RowDataPacket[];
        const cars = result[0];

        const axiosPapers: AxiosPaperList[] = [];

        cars.map((axiosData: any) => {
            const { is_car_dealer, price, city, federal_state, brand, model, inserate_id, cartype, transmission, mileage_km, registration_year, registration_month, power_ps, fuel, accident, vehicle_owners } = axiosData;
            
            const axiosPaperList: AxiosPaperList = {
                isCarDealer: is_car_dealer, price, city, federalState: federal_state, brand, model, transmission, cartype, fuel, accident,
                inseratId: inserate_id, mileageKm: mileage_km, registrationMonth: registration_month, registrationYear: registration_year, psPower: power_ps, vehicleOwners: vehicle_owners
            }

            axiosPapers.push(axiosPaperList);

        })

        connection.end();
        return res.status(200).json(axiosPapers);

    } catch (error: any) {
        console.log(error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }

}