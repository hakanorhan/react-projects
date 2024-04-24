import { pool } from "../dbConnect.js";
import { SelectFieldEnums } from "../enums/SelectFieldEnums.js";
var E;
(function (E) {
    E["INSERATE"] = "inserate";
    E["INSERATE_ID"] = "inserate_id";
    E["INSERATE_INFO"] = "inserate_info";
    E["INSERATE_INFO_ID"] = "inserate_info_id";
    E["INSERATE_CHECK"] = "inserate_check";
    E["INSERATE_CHECK_ID"] = "inserate_check_id";
    E["USER"] = "user";
    E["USER_ID"] = "user_id";
    E["USER_DEALER"] = "user_dealer";
    E["USER_DEALER_ID"] = "user_dealer_id";
    E["FEDERAL_STATE"] = "federal_state";
    E["FEDERAL_STATE_ID"] = "federal_state_id";
    E["ADRESS"] = "address";
    E["ADDRESS_ID"] = "address_id";
    E["CONTACT_PREFFERED"] = "contact_preffered";
    E["CONTACT_PREFFERED_ID"] = "contact_preffered_id";
    E["BRAND"] = "brand";
    E["BRAND_ID"] = "brand_id";
    E["MODEL"] = "model";
    E["MODEL_ID"] = " model_id";
    E["FUEL"] = "fuel";
    E["FUEL_ID"] = "fuel_id";
    E["DOOR"] = "door";
    E["DOOR_ID"] = "door_id";
    E["VEHICLE_CONDITION"] = "vehicle_condition";
    E["VEHICLE_CONDITION_ID"] = "vehicle_condition_id";
    E["CARTYPE"] = "cartype";
    E["CARTYPE_ID"] = "cartype_id";
    E["FEATURE"] = "feature";
    E["FEATURE_ID"] = "feature_id";
    E["TRANSMISSION"] = "transmission";
    E["TRANSMISSION_ID"] = "transmission_id";
    E["TECHNICAL_DESCRIPTION"] = "technical_description";
    E["TECHNICAL_DESCRIPTION_ID"] = "technical_description_id";
    E["CLIMA"] = "clima";
    E["CLIMA_ID"] = "clima_id";
    E["TUEV"] = "tuev";
    E["TUEV_ID"] = "tuev_id";
})(E || (E = {}));
const statementInitialCount = `SELECT COUNT(i.inserate_id) as count FROM inserate i`;
async function performQueryGet(req, res) {
    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;
    console.log(" ***** ******* " + dateFrom + " to: " + dateTo);
    const whereClause = [" i.inserate_id = ic.inserate_id AND ic.inserate_public = 1 AND ic.inserate_cancelled = 0 ", " AND ii.inserate_info_id = i.inserate_info_id AND ii.is_active = 1 AND i.technical_description_id = td.technical_description_id "];
    const whereValue = [];
    let query = "SELECT COUNT(i.inserate_id) AS count FROM inserate i, inserate_check ic, inserate_info ii, brand b, model m, cartype ct, technical_description td, user u, personal_data pd, address ad, federal_state fs ";
    query = query + " WHERE ";
    if (modelid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND m.model_id = i.model_id ");
    }
    else {
        whereClause.push(" AND m.model_id = i.model_id AND m.model_id = ? ");
        whereValue.push(modelid);
    }
    if (brandid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND m.brand_id = b.brand_id ");
    }
    else {
        whereClause.push(" AND m.brand_id = b.brand_id AND b.brand_id = ? ");
        whereValue.push(brandid);
    }
    if (cartypeid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND ct.cartype_id = td.cartype_id ");
    }
    else {
        whereClause.push(" AND ct.cartype_id = td.cartype_id AND ct.cartype_id = ? ");
        whereValue.push(cartypeid);
    }
    if (price !== SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND i.price < ? ");
        whereValue.push(price);
    }
    if (dateFrom === undefined && dateTo) {
        whereClause.push(" AND td.registration_year < ? ");
        whereValue.push(dateTo);
    }
    else if (dateFrom && dateTo) {
        whereClause.push(" AND td.registration_year between ? AND ?  ");
        whereValue.push(dateFrom);
        whereValue.push(dateTo);
    }
    if (blandid === SelectFieldEnums.ALL_VALUE) {
        whereClause.push(" AND i.inserate_info_id = ii.inserate_info_id AND ii.user_id = u.user_id AND u.personal_data_id = pd.personal_data_id AND pd.address_id = ad.address_id AND ad.federal_state_id = fs.federal_state_id ");
    }
    else {
        whereClause.push(" AND i.inserate_info_id = ii.inserate_info_id AND ii.user_id = u.user_id AND u.personal_data_id = pd.personal_data_id AND pd.address_id = ad.address_id AND ad.federal_state_id = fs.federal_state_id AND fs.federal_state_id = ? ");
        whereValue.push(blandid);
    }
    whereClause.map((clause) => {
        query = query + clause;
    });
    let connection;
    try {
        connection = await pool.getConnection();
        console.log("--- Abfrage ---");
        console.log(query);
        const queryResult = await connection.execute(query, whereValue);
        const result = queryResult;
        const count = result[0][0].count;
        return res.status(200).json(count);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occured.' });
    }
    finally {
        connection?.release();
    }
}
export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            performQueryGet(req, res);
            break;
        case 'POST':
            const requestData = req.body;
            break;
        default:
            res.status(500).json({ message: "Error occured" });
    }
};
