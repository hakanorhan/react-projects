import { connectToDatabase } from "../dbConnect1.js";
import { SelectFieldEnums } from "../enums/SelectFieldEnums.js";
import { selectMysqlErrorMessages } from "../helper/messages.js";
export async function performQueryGet(req, res) {
    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;
    const whereClause = [" i.inserate_id = ic.inserate_id AND i.entwurf = 0 AND ic.inserate_public = 1 AND ic.inserate_cancelled = 0 ", " AND ii.inserate_info_id = i.inserate_info_id AND ii.is_active = 1 AND i.technical_description_id = td.technical_description_id "];
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
    if ((dateFrom === undefined && dateTo) || (dateFrom === SelectFieldEnums.ALL_VALUE && dateTo !== SelectFieldEnums.ALL_VALUE)) {
        whereClause.push(" AND td.registration_year < ? ");
        whereValue.push(dateTo);
    }
    else if ((dateFrom && dateTo) && (dateFrom !== SelectFieldEnums.ALL_VALUE && dateTo !== SelectFieldEnums.ALL_VALUE)) {
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
        connection = await connectToDatabase();
        const queryResult = await connection.execute(query, whereValue);
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
export default async (req, res) => {
    performQueryGet(req, res);
};
