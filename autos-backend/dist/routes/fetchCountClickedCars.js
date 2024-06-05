import { connectToDatabase } from '../dbConnect1.js';
import { selectMysqlErrorMessages } from '../helper/messages.js';
import { DisplayTypes } from '../enums/DisplayTypes.js';
export async function fetchCountClickedCars(req, res) {
    const type = req.body.type;
    const whereClause = [" i.inserate_id = ic.inserate_id AND i.entwurf = 0 AND ic.inserate_public = 1 AND ic.inserate_cancelled = 0 ", " AND ii.inserate_info_id = i.inserate_info_id AND ii.is_active = 1 AND i.technical_description_id = td.technical_description_id AND td.fuel_id = f.fuel_id AND td.vehicle_condition_id = vc.vehicle_condition_id AND td.transmission_id = t.transmission_id AND td.cartype_id = ct.cartype_id "];
    const attributes = " COUNT(i.inserate_id) as count ";
    let query = "SELECT " + attributes + " FROM inserate i, inserate_check ic, inserate_info ii, brand b, model m, cartype ct, technical_description td, user u, personal_data pd, address ad, federal_state fs, fuel f, transmission t, vehicle_condition vc";
    query = query + " WHERE ";
    whereClause.push(" AND m.model_id = i.model_id ");
    whereClause.push(" AND m.brand_id = b.brand_id ");
    whereClause.push(" AND ct.cartype_id = td.cartype_id ");
    whereClause.push(" AND i.inserate_info_id = ii.inserate_info_id AND ii.user_id = u.user_id AND u.personal_data_id = pd.personal_data_id AND pd.address_id = ad.address_id AND ad.federal_state_id = fs.federal_state_id ");
    if (type === DisplayTypes.ELECTRIC) {
        whereClause.push(' AND f.fuel_id = 4 ');
    }
    whereClause.map((clause) => {
        query = query + clause;
    });
    query = query + (type === DisplayTypes.MOST_CLICKED ? " ORDER BY i.clicks DESC, i.price DESC, td.registration_year DESC" : " ");
    let connection;
    try {
        connection = await connectToDatabase();
        const queryResult = await connection.query(query);
        const result = queryResult;
        const count = result[0][0].count;
        connection.end();
        return res.status(200).json(count);
    }
    catch (error) {
        console.log(error);
        connection?.end();
        selectMysqlErrorMessages(error.code, res);
    }
}
