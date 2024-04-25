import express from 'express';
import { pool } from '../dbConnect.js';
import { RowDataPacket } from 'mysql2';
import { selectMysqlErrorMessages } from '../helper/messages.js';
import { SelectFieldEnums } from '../enums/SelectFieldEnums.js';

export async function fetchListCars(req: express.Request, res: express.Response) {

    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;

    console.log("date: " + dateFrom);

    const whereClause: string[] = [" i.inserate_id = ic.inserate_id AND ic.inserate_public = 1 AND ic.inserate_cancelled = 0 ", " AND ii.inserate_info_id = i.inserate_info_id AND ii.is_active = 1 AND i.technical_description_id = td.technical_description_id AND td.fuel_id = f.fuel_id AND td.vehicle_condition_id = vc.vehicle_condition_id "];
    const whereValue: any[] = [];

    const attributes = " i.inserate_id, b.brand, m.model, i.price, ad.city, fs.federal_state, td.vehicle_owners, td.mileage_km, td.registration_year, td.registration_month, td.power_ps, f.fuel, vc.fit_to_drive ";

    let query = "SELECT " + attributes + " FROM inserate i, inserate_check ic, inserate_info ii, brand b, model m, cartype ct, technical_description td, user u, personal_data pd, address ad, federal_state fs, fuel f, vehicle_condition vc";
    
    query = query + " WHERE ";

    // model
    if (modelid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND m.model_id = i.model_id ");
    } else {

        whereClause.push( " AND m.model_id = i.model_id AND m.model_id = ? " );
        whereValue.push(modelid);
    }

    // model depends on brand
    if (brandid === SelectFieldEnums.ALL_VALUE) { 
        whereClause.push(" AND m.brand_id = b.brand_id "); 
    }
    else { 
        whereClause.push( " AND m.brand_id = b.brand_id AND b.brand_id = ? ") 
        whereValue.push( brandid );
    }

    // cartype
    if (cartypeid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND ct.cartype_id = td.cartype_id ");
    } else {
        whereClause.push(" AND ct.cartype_id = td.cartype_id AND ct.cartype_id = ? ");
        whereValue.push( cartypeid );
    }

    // price
    if (price !== SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND i.price < ? ");
        whereValue.push(price);
    }

    if (dateFrom && dateTo && dateFrom !== SelectFieldEnums.ALL_VALUE && dateTo !== SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND td.registration_year between ? AND ?  ");
        whereValue.push(dateFrom);
        whereValue.push(dateTo);
    } else if (dateFrom !== SelectFieldEnums.ALL_VALUE && dateTo) {
        whereClause.push(" AND td.registration_year < ? ");
        whereValue.push(dateTo)
    }

    if(blandid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND i.inserate_info_id = ii.inserate_info_id AND ii.user_id = u.user_id AND u.personal_data_id = pd.personal_data_id AND pd.address_id = ad.address_id AND ad.federal_state_id = fs.federal_state_id ");
    } else {
        whereClause.push(" AND i.inserate_info_id = ii.inserate_info_id AND ii.user_id = u.user_id AND u.personal_data_id = pd.personal_data_id AND pd.address_id = ad.address_id AND ad.federal_state_id = fs.federal_state_id AND fs.federal_state_id = ? ");    
        whereValue.push(blandid);
    }
    

    whereClause.map((clause) => {
        query = query + clause;
    })


    let connection;
    try {
        connection = await pool.getConnection();

        const queryResult = await connection.execute(query, whereValue);
            const result = queryResult as RowDataPacket[];
            const cars = result[0];
            console.log(cars)
            return res.status(200).json(cars);

    } catch (error: any) {
        console.log(error);
        selectMysqlErrorMessages(error.code, res);
    } finally {
        connection?.release();
    }

}