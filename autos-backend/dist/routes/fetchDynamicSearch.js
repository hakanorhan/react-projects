import { pool } from "../dbConnect.js";
import { SelectFieldEnums } from "../enums/SelectFieldEnums.js";
var E;
(function (E) {
    E["CARS_LONG"] = "cars";
    E["CARS_SHORT"] = "c";
    E["CAR_ID"] = "carid";
    E["MODELS_LONG"] = "models";
    E["MODELS_SHORT"] = "m";
    E["MODEL_NAME"] = "model";
    E["MODEL_ID"] = "modelid";
    E["BRANDS_LONG"] = "brands";
    E["BRANDS_SHORT"] = "b";
    E["BRAND_NAME"] = "brand";
    E["BRAND_ID"] = "brandid";
    E["CARTYPES_LONG"] = "cartypes";
    E["CARTYPES_SHORT"] = "ct";
    E["CARTYPE_NAME"] = "cartype";
    E["CARTYPE_ID"] = "cartypeid";
    E["BUNDESLAND_LONG"] = "bundesland";
    E["BUNDESLAND_SHORT"] = "bl";
    E["BUNDESLAND_NAME"] = "bundesland";
    E["BUNDESLAND_ID"] = "blandid";
    E["ADVERTISEINFO_LONG"] = "advertiseinfo";
    E["ADVERTISEINFO_SHORT"] = "ai";
    E["ADVERTISEINFO_NAME"] = "advertiseinfo";
    E["ADVERTISEINFO_ID"] = "advertiseinfoid";
})(E || (E = {}));
const statementInitialCount = "SELECT COUNT(carid) as count FROM cars c";
async function performQueryGet(req, res) {
    const { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo } = req.query;
    const modelStatement = { joinStatement: " JOIN models m ON c.modelid = m.modelid", whereStatement: " m.modelid = ?", whereValue: modelid };
    const brandStatement = { joinStatement: " JOIN brands b ON b.brandid = m.brandid", whereStatement: " b.brandid = ?", whereValue: brandid };
    const carTypesStatement = { joinStatement: " JOIN cartypes ct ON ct.cartypeid = c.cartypeid", whereStatement: " ct.cartypeid = ?", whereValue: cartypeid };
    const advertiseInfoStatement = { joinStatement: " JOIN advertiseinfo ai ON c.advertiseinfoid = ai.advertiseinfoid", whereStatement: " ai.advertiseinfoid = ?", whereValue: null };
    const userStatement = { joinStatement: " JOIN user u ON ai.userid = u.userid", whereStatement: " u.userid = ?", whereValue: null };
    const personStatement = { joinStatement: " JOIN person p ON u.userid = p.personid", whereStatement: " p.personid = ?", whereValue: null };
    const addressStatement = { joinStatement: " JOIN address ad ON ad.addressid = p.addressid", whereStatement: " ad.addressid = ?", whereValue: null };
    const bundeslandStatement = { joinStatement: " JOIN bundesland bl ON bl.blandid = ad.blandid", whereStatement: " bl.blandid = ?", whereValue: blandid };
    const statements = { modelStatement, brandStatement, carTypesStatement, advertiseInfoStatement, userStatement, personStatement, addressStatement, bundeslandStatement };
    let query = statementInitialCount + modelStatement.joinStatement + brandStatement.joinStatement + carTypesStatement.joinStatement
        + advertiseInfoStatement.joinStatement + userStatement.joinStatement + personStatement.joinStatement
        + addressStatement.joinStatement + bundeslandStatement.joinStatement;
    const whereValues = [];
    let connection;
    try {
        connection = await pool.getConnection();
        if (SelectFieldEnums.ALL_VALUE && modelid === SelectFieldEnums.ALL_VALUE &&
            price === SelectFieldEnums.ALL_VALUE && cartypeid === SelectFieldEnums.ALL_VALUE && dateFrom === undefined && dateTo === undefined) {
            const queryResult = await connection.execute(query);
            const result = queryResult;
            const count = result[0][0].count;
            return res.status(200).json(count);
        }
        else {
            query = query + " WHERE";
            let i = 0;
            for (const [key1, value1] of Object.entries(statements)) {
                if (value1.whereValue === SelectFieldEnums.ALL_VALUE || value1.whereValue === "" || value1.whereValue === null) {
                    i = i + 1;
                }
                else {
                    query = query + value1.whereStatement + " AND";
                    whereValues.push(value1.whereValue);
                }
            }
            if (i < Object.entries(statements).length) {
                console.log("Länge sollte 8 sein: " + i);
                query = query.substring(0, query.length - 4);
                console.log(query);
            }
            else {
                query = query.substring(0, query.length - 5);
                console.log(query);
            }
            const queryResult = await connection.execute(query, whereValues);
            const result = queryResult;
            const count = result[0][0].count;
            return res.status(200).json(count);
        }
    }
    catch (error) {
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
